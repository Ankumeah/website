const user = "Ankumeah"

async function main() {
  const projects = [
    "SourceFlame",
    "NilSky",
    "JSBEE",
    "mdv",
    "loFunc",
    "dotfiles",
    "pkgeep",
    "mfg-v2",
  ];

  const projectsDiv = document.getElementById("projects");
  for (let project of projects) {
    const proj = await getProject(project)

    proj && projectsDiv.appendChild(projectComponent(proj));
  }
}

async function getProject(name) {
  let resp = await fetch(`https://api.github.com/repos/${user}/${name}`);
  if (!resp.ok) {
    return null;
  }
  let info = {};
  try {
    info = await resp.json();
  } catch (err) {
    console.log("Invalid json from repo api: ", err);
  }

  let logo = "no-logo.png"
  resp = await fetch(`https://raw.githubusercontent.com/${user}/${name}/refs/heads/master/logo.png`);
  if (resp.ok) {
    logo = `https://raw.githubusercontent.com/${user}/${name}/refs/heads/master/logo.png`;
  }

  const url = `https://github.com/${user}/${name}`;
  const desp = info.description;

  return new projectInfo(logo, name, url, desp);
}

document.addEventListener(
  "DOMContentLoaded",
  main,
);
