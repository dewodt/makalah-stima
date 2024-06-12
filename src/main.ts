import { Bf } from "./bf";
import { Kmp } from "./kmp";
import { Bm } from "./bm";
import { spamWordsList } from "./spam-words-list";
import { readFileSync } from "fs";
import chalk from "chalk";
import { readdirSync } from "fs";

type Solution = {
  start: number;
  end: number;
};

const getNoSubsetSolution = (initialSolution: Solution[]): Solution[] => {
  // No solution
  if (initialSolution.length === 0) {
    return [];
  }

  // [0, 3] [4, 5] [1, 2] [1,4] returns [0, 5]

  // Sort the solutions by start index
  const solutions = initialSolution.sort((a, b) => a.start - b.start);

  // Initialize the result
  const result: Solution[] = [solutions[0]];

  // Iterate through the solutions
  for (let i = 1; i < solutions.length; i++) {
    const currentSolution = solutions[i];
    const lastSolution = result[result.length - 1];

    // Check if the current solution is a subset of the last solution
    if (currentSolution.start <= lastSolution.end) {
      // Update the last solution
      result[result.length - 1] = {
        start: lastSolution.start,
        end: Math.max(lastSolution.end, currentSolution.end),
      };
    } else {
      // Add the current solution to the result
      result.push(currentSolution);
    }
  }

  return result;
};

const printHighlitedText = (text: string, solutions: Solution[]): void => {
  // console.log(solutions);
  const noSubsetSolution = getNoSubsetSolution(solutions);
  // console.log(noSubsetSolution);

  // For each solution, highlight the text
  let highlightedText = "";

  // Initialize the start index
  let i = 0;

  for (const solution of noSubsetSolution) {
    // Add the text before the solution
    highlightedText += text.substring(i, solution.start);

    // Highlight the solution
    highlightedText += chalk.red(
      text.substring(solution.start, solution.end + 1)
    );

    // Update the start index
    i = solution.end + 1;
  }

  // Add the remaining text
  highlightedText += text.substring(i);

  // Print the highlighted text
  console.log(highlightedText);
};

const main = () => {
  // Read test folder
  const testFolder = "./test";
  const files = readdirSync(testFolder).sort(
    (f1, f2) => parseInt(f1.split(".")[0]) - parseInt(f2.split(".")[0])
  );
  console.log(files);

  // For each file in the test folder, read the content and search for the first spam word
  console.log("============================================");
  console.log("Brute Force");
  console.time("Brute Force Total Duration");
  files.forEach((file) => {
    console.log("File:", file);
    console.time("Duration");

    // Read the content of the file
    const text = readFileSync(`${testFolder}/${file}`, "utf8");

    // Search for spam words using Brute Force
    const solutions: Solution[] = [];
    for (const word of spamWordsList) {
      const res = Bf(text, word);
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
      const res = Kmp(text, word);
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
      const res = Bm(text, word);
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
