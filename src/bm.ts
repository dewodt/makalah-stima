export const Bm = (text: string, pattern: string): number => {
  // Get the length of the text and the pattern
  const n = text.length;
  const m = pattern.length;

  // Initialize the Bad Character Shift table
  const last = new Array(256).fill(-1);

  // Fill last occurrence of each character in pattern
  for (let i = 0; i < m; i++) {
    last[pattern.charCodeAt(i)] = i;
  }

  // Initialize the index
  let i = m - 1;
  // Not found if pattern is longer than text
  if (i > n - 1) {
    return -1;
  }

  let j = m - 1;
  // Search for the pattern in the text
  while (i <= n - 1) {
    if (pattern[j] === text[i]) {
      if (j === 0) {
        // Pattern found
        return i;
      }
      // Move to the left
      i--;
      j--;
    } else {
      // Shift the pattern to the right
      i = i + m - Math.min(j, 1 + last[text.charCodeAt(i)]);
      j = m - 1;
    }
  }

  // Pattern not found
  return -1;
};
