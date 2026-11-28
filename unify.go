package main

import (
	"fmt"
	"io"
	"os"

	"golang.org/x/net/html"
)

var files = map[string][]byte{
	"styles.css":    []byte{},
	"script.js":     []byte{},
	"components.js": []byte{},
}

func main() {
	for file, _ := range files {
		f, err := os.Open(file)
		if err != nil {
			fmt.Printf("Error opening %s: %v\n", file, err)
			os.Exit(1)
		}
		defer f.Close()

		data, err := io.ReadAll(f)
		if err != nil {
			fmt.Printf("Error reading %s: %v\n", file, err)
			os.Exit(1)
		}

		files[file] = data
	}

	f, err := os.Open("index.html")
	if err != nil {
		fmt.Printf("Error opening index.html: %v\n", err)
		os.Exit(1)
	}
	defer f.Close()

	doc, err := html.Parse(f)
	if err != nil {
		fmt.Printf("Error parsing index.html: %v\n", err)
		os.Exit(1)
	}

	walk(doc)

	html.Render(os.Stdout, doc)
}

func walk(n *html.Node) {
	if n.Type == html.ElementNode {
		switch n.Data {
		case "link":
			injectCSS(n)
		case "script":
			injectJS(n)
		}
	}

	for child := n.FirstChild; child != nil; {
		next := child.NextSibling
		walk(child)
		child = next
	}
}

func injectCSS(n *html.Node) {
	file := ""
	for _, attr := range n.Attr {
		if attr.Key == "href" {
			file = attr.Val
			break
		}
	}

	style := &html.Node{
		Data: "style",
		Type: html.ElementNode,
	}

	style.AppendChild(
		&html.Node{
			Data: string(files[file]),
			Type: html.TextNode,
		},
	)

	n.Parent.InsertBefore(style, n.NextSibling)
	n.Parent.RemoveChild(n)
}

func injectJS(n *html.Node) {
	file := ""
	for _, attr := range n.Attr {
		if attr.Key == "src" {
			file = attr.Val
			break
		}
	}

	script := &html.Node{
		Data: "script",
		Type: html.ElementNode,
	}

	script.AppendChild(
		&html.Node{
			Data: string(files[file]),
			Type: html.TextNode,
		},
	)

	n.Parent.InsertBefore(script, n.NextSibling)
	n.Parent.RemoveChild(n)
}
