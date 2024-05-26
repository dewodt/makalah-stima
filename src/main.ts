import { Bf } from "./bf";
import { Kmp } from "./kmp";
import { Bm } from "./bm";
import { spamWordsList } from "./spam-words-list";
import { readFileSync } from "fs";
import { readdirSync } from "fs";

const main = () => {
  // Read test folder
  const testFolder = "./test";
  const files = readdirSync(testFolder);

  // For each file in the test folder, read the content and search for the first spam word
  console.log("============================================");
  console.log("Brute Force");
  files.forEach((file) => {
    console.log("File:", file);
    console.time("Duration");

    // Read the content of the file
    const text = readFileSync(`${testFolder}/${file}`, "utf8");

    // Search for spam words using Brute Force
    let found = false;
    for (const word of spamWordsList) {
      const res = Bf(text, word);
      if (res !== -1) {
        console.log(
          `Found spam word "${word}" in file ${file} at index ${res}`
        );
        found = true;
        break;
      }
    }

    // Stop the timer
    console.timeEnd("Duration");

    // If no spam words are found
    if (!found) {
      console.log("No spam words found");
    }
  });
  console.log("============================================");

  console.log("============================================");
  console.log("Knuth-Morris-Pratt");
  files.forEach((file) => {
    console.log("File:", file);
    console.time("Duration");

    // Read the content of the file
    const text = readFileSync(`${testFolder}/${file}`, "utf8");

    // Search for spam words using Knuth-Morris-Pratt
    let found = false;
    for (const word of spamWordsList) {
      const res = Kmp(text, word);
      if (res !== -1) {
        console.log(
          `Found spam word "${word}" in file ${file} at index ${res}`
        );
        found = true;
        break;
      }
    }

    // Stop the timer
    console.timeEnd("Duration");

    // If no spam words are found
    if (!found) {
      console.log("No spam words found");
    }
  });
  console.log("============================================");

  // Boyer-Moore
  console.log("============================================");
  console.log("Boyer-Moore");
  files.forEach((file) => {
    console.log("File:", file);
    console.time("Duration");

    // Read the content of the file
    const text = readFileSync(`${testFolder}/${file}`, "utf8");

    // Search for spam words using Boyer-Moore
    let found = false;
    for (const word of spamWordsList) {
      const res = Bm(text, word);
      if (res !== -1) {
        console.log(
          `Found spam word "${word}" in file ${file} at index ${res}`
        );
        found = true;
        break;
      }
    }

    // Stop the timer
    console.timeEnd("Duration");

    // If no spam words are found
    if (!found) {
      console.log("No spam words found");
    }
  });
};

main();
