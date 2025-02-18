const fs = require("fs");
const path = require("path");

fs.writeFileSync(
  "garbageDigimon.json",
  JSON.stringify([
    { rank: 1, name: "Agumon" },
    { rank: 2, name: "Numemon" },
  ])
);

const garbageDigimonData = fs.readFileSync("garbageDigimon.json");

console.log(JSON.parse(garbageDigimonData.toString()));

const dataPath = path.resolve("data");

if (!fs.existsSync(dataPath)) {
  fs.mkdirSync(dataPath);
}

fs.writeFileSync(path.join(dataPath, "user.json"), "{}");

fs.writeFileSync(
  path.join(dataPath, ".gitignore"),
  "# Ignore files and directories in this folder"
);

fs.appendFileSync(
  path.join(dataPath, ".gitignore"),
  `

node_modules`
);
