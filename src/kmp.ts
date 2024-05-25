export const Kmp = (text: string, pattern: string): number => {
  // Get the length of the text and the pattern
  const n = text.length;
  const m = pattern.length;

  // Initialize the Longest prefix suffix (LPS) array
  const lps = new Array(m).fill(0);

  // Calculate the LPS array
  let i = 1;
  let j = 0;
  while (i < m) {
    if (pattern[i] === pattern[j]) {
      // If the characters match, increment both i and j
      lps[i] = j + 1;
      j++;
      i++;
    } else if (j > 0) {
      // If the characters do not match and j > 0, update j
      j = lps[j - 1];
    } else {
      // If the characters do not match and j = 0, increment i
      lps[i] = 0;
      i++;
    }
  }

  // Perform the KMP search
  i = 0;
  j = 0;
  while (i < n) {
    if (pattern[j] === text[i]) {
      // If the characters match
      if (j == m - 1) {
        // If the pattern is found, return the starting index
        return i - j;
      } else {
        // Increment both i and j
        i++;
        j++;
      }
    } else if (j > 0) {
      // If the characters do not match and j > 0, update j
      j = lps[j - 1];
    } else {
      // If the characters do not match and j = 0, increment i
      i++;
    }
  }

  // If the pattern is not found, return -1
  return -1;
};
