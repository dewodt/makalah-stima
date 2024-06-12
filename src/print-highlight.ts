import chalk from "chalk";
import type { Solution } from "./types";

export const getNoSubsetSolution = (
  initialSolution: Solution[]
): Solution[] => {
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

export const printHighlitedText = (
  text: string,
  solutions: Solution[]
): void => {
  const noSubsetSolution = getNoSubsetSolution(solutions);

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
