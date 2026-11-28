class projectInfo {
  img = "";
  title = "";
  url = "";
  text = "";

  constructor(img, title, url, text) {
    this.img = img;
    this.title = title;
    this.url = url;
    this.text = text;
  }
}

const projectComponent = (info) => {
  console.log(info);

  const div = document.createElement("div");
  const pic = document.createElement("img");
  const text = document.createElement("p");
  const link = document.createElement("a");
  const title = document.createElement("h2");

  div.className = "project";

  pic.src = info.img;

  title.innerText = info.title;

  link.href = info.url;
  link.innerText = "Repository"
  link.target = "_blank";

  text.innerText = info.text;

  div.appendChild(pic);
  div.appendChild(title);
  div.appendChild(link);
  div.appendChild(text);

  return div;
};
