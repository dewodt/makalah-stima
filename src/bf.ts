export const Bf = (text: string, pattern: string): number => {
  // Get the length of the text and the pattern
  const n = text.length;
  const m = pattern.length;

  // Perform the Brute Force search
  for (let i = 0; i <= n - m; i++) {
    // Check for a match at position i
    let j = 0;
    while (j < m && text[i + j] === pattern[j]) {
      j++;
    }

    // If the pattern is found, return the starting index
    if (j === m) {
      return i;
    }
  }

  // If the pattern is not found, return -1
  return -1;
};
