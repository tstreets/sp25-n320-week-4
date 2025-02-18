#!/usr/bin/env node

const path = require("path");
const fs = require("fs");
const readline = require("readline");

const app = readline.createInterface({
  output: process.stdout,
  input: process.stdin,
});

function quitApp() {
  app.close();
}

function includeFunctionsFolder(callback) {
  app.question("Include functions (Y/n):", function (userAnswer) {
    const cleanedAnswer = userAnswer.trim().toLowerCase();
    if (userAnswer === "y" || !userAnswer) {
      // do this
      callback(true);
    } else if (userAnswer === "n") {
      // do this
      callback(false);
    } else {
      includeFunctionsFolder(callback);
    }
  });
}

app.question("Name of project:", function (projectName) {
  const baseDirectory =
    process.env.TEST === "1" ? path.resolve("output") : process.cwd();
  const projectDirectory = path.join(baseDirectory, projectName);
  const functionsDirectory = path.join(projectDirectory, "functions");
  const readmeFile = path.join(projectDirectory, "readme.md");

  if (!fs.existsSync(projectDirectory)) {
    fs.mkdirSync(projectDirectory);
  }

  includeFunctionsFolder(function (makeFunctionsFolder) {
    if (makeFunctionsFolder) {
      fs.mkdirSync(functionsDirectory);

      const webfileLibRef = path.join(__dirname, "lib/webfile.js");
      fs.writeFileSync(
        path.join(functionsDirectory, "webfile.js"),
        fs.readFileSync(webfileLibRef)
      );

      const serverLibRef = path.join(__dirname, "lib/server.js");
      fs.writeFileSync(
        path.join(projectDirectory, "server.js"),
        fs.readFileSync(serverLibRef)
      );
    }

    fs.writeFileSync(readmeFile, "## Project Name");
    quitApp();
  });
});
