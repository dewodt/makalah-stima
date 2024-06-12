import { Bf } from "./bf";
import { Kmp } from "./kmp";
import { Bm } from "./bm";
import { regexMatch } from "./regex";
import chalk from "chalk";
import { printHighlitedText } from "./print-highlight";
import { spamWordsList } from "./spam-words-list";
import { readFileSync } from "fs";
import { readdirSync } from "fs";
import type { Solution } from "./types";

const main = () => {
  // Read test folder
  const testFolder = "./test";
  const files = readdirSync(testFolder).sort(
    (f1, f2) => parseInt(f1.split(".")[0]) - parseInt(f2.split(".")[0])
  );

  // Regex
  console.log("============================================");
  console.log("Regex");
  console.time("Regex Total Duration");
  files.forEach((file) => {
    console.log("File:", file);
    console.time("Duration");

    // Read the content of the file
    const text = readFileSync(`${testFolder}/${file}`, "utf8");

    // Search for spam words using Regex
    const solutions = regexMatch(text);

    // Stop the timer
    console.timeEnd("Duration");

    // Print
    printHighlitedText(text, solutions);

    // If no spam words are found
    if (!solutions.length) {
      console.log(chalk.red("No spam words found"));
    }
    console.log();
  });
  console.timeEnd("Regex Total Duration");
  console.log("============================================");

  // For each file in the test folder, read the content and search for the first spam word
  console.log("============================================");
  console.log("Brute Force");
  console.time("Brute Force Total Duration");
  files.forEach((file) => {
    console.log("File:", file);
    console.time("Duration");

    // Read the content of the file
    const text = readFileSync(`${testFolder}/${file}`, "utf8").toLowerCase();

    // Search for spam words using Brute Force
    const solutions: Solution[] = [];
    for (const word of spamWordsList) {
      const res = Bf(text.toLowerCase(), word.toLowerCase()); // Case insensitive
      if (res !== -1) {
        solutions.push({ start: res, end: res + word.length - 1 });
      }
    }

    // Stop the timer
    console.timeEnd("Duration");

    // Print
    printHighlitedText(text, solutions);

    // If no spam words are found
    if (!solutions.length) {
      console.log(chalk.red("No spam words found"));
    }
    console.log();
  });
  console.timeEnd("Brute Force Total Duration");
  console.log("============================================");

  console.log("============================================");
  console.log("Knuth-Morris-Pratt");
  console.time("Knuth Morris Pratt Total Duration");
  files.forEach((file) => {
    console.log("File:", file);
    console.time("Duration");

    // Read the content of the file
    const text = readFileSync(`${testFolder}/${file}`, "utf8");

    // Search for spam words using Knuth-Morris-Pratt
    const solutions: Solution[] = [];
    for (const word of spamWordsList) {
      const res = Kmp(text.toLowerCase(), word.toLowerCase()); // Case insensitive
      if (res !== -1) {
        solutions.push({ start: res, end: res + word.length - 1 });
      }
    }

    // Stop the timer
    console.timeEnd("Duration");

    // Print
    printHighlitedText(text, solutions);

    // If no spam words are found
    if (!solutions.length) {
      console.log(chalk.red("No spam words found"));
    }
    console.log();
  });
  console.timeEnd("Knuth Morris Pratt Total Duration");
  console.log("============================================");

  // Boyer-Moore
  console.log("============================================");
  console.log("Boyer-Moore");
  console.time("Boyer Moore Total Duration");
  files.forEach((file) => {
    console.log("File:", file);
    console.time("Duration");

    // Read the content of the file
    const text = readFileSync(`${testFolder}/${file}`, "utf8");

    // Search for spam words using Boyer-Moore
    const solutions: Solution[] = [];
    for (const word of spamWordsList) {
      const res = Bm(text.toLowerCase(), word.toLowerCase()); // Case insensitive
      if (res !== -1) {
        solutions.push({ start: res, end: res + word.length - 1 });
      }
    }

    // Stop the timer
    console.timeEnd("Duration");

    // Print the highlighted text
    printHighlitedText(text, solutions);

    // If no spam words are found
    if (!solutions.length) {
      console.log(chalk.red("No spam words found"));
    }
    console.log();
  });
  console.timeEnd("Boyer Moore Total Duration");
  console.log("============================================");
};

main();
