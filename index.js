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
      callback();
    } else if (userAnswer === "n") {
      // do this
      callback();
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

  includeFunctionsFolder(function () {
    fs.writeFileSync(readmeFile, "## Project Name");
    quitApp();
  });
});
