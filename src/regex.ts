import { type Solution } from "./types";
import { spamWordsList } from "./spam-words-list";

export const regexMatch = (text: string): Solution[] => {
  // Convert the spam words list to a regex pattern
  const spamPattern = new RegExp(
    spamWordsList.map((word) => `\\b${word}\\b`).join("|"),
    "gi"
  );

  // Regex spam
  const spamPatterns = [
    spamPattern, // Keywords
    /(?:http:\/\/|https:\/\/|www\.)\S+/gi, // URLs
    /(.)\1{3,}/gi, // Repeated characters
  ];

  // Initialize the result
  const result: Solution[] = [];

  // Iterate through the spam patterns
  for (const spamPattern of spamPatterns) {
    // Find all the matches
    const matches = text.matchAll(spamPattern);

    // Iterate through the matches
    for (const match of matches) {
      // Add the match to the result
      result.push({
        start: match.index,
        end: match.index + match[0].length - 1,
      });
    }
  }

  // Return the result
  return result;
};
