function main() {
  const mod = new Modifier
  mod.add(
    (elem) => {
      elem.style.width = "100%";
    }
  ).apply("h1");
}

document.addEventListener(
  "DOMContentLoaded",
  main,
);
