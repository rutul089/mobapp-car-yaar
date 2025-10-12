/**
 * Calculates the similarity percentage between two names.
 * - Removes Indian honorifics ("Mr", "Mrs", "Shri", etc.)
 *
 * @param {string} name1
 * @param {string} name2
 * @returns {number} match percentage (0–100)
 */
export const getNameMatchPercentage = (name1, name2) => {
  if (!name1 || !name2) {
    return 0;
  }

  const tokens1 = normalizeAndSplit(cleanHonorifics(name1));
  const tokens2 = normalizeAndSplit(cleanHonorifics(name2));

  if (tokens1.join(' ') === tokens2.join(' ')) {
    return 100;
  }

  let totalScore = 0;
  let matches = 0;

  for (const t1 of tokens1) {
    let bestMatch = 0;
    for (const t2 of tokens2) {
      const score = stringSimilarity(t1, t2);
      if (score > bestMatch) {
        bestMatch = score;
      }
    }
    totalScore += bestMatch;
    matches++;
  }

  const avgScore = totalScore / Math.max(matches, 1);
  return Math.round(avgScore * 10000) / 100;
};

// 🧹 Remove common Indian prefixes/titles
const cleanHonorifics = name => {
  const honorifics = [
    'mr',
    'mrs',
    'ms',
    'miss',
    'shri',
    'shree',
    'smt',
    'kumari',
    'dr',
    'prof',
    'adv',
    'md',
    'sir',
  ];
  let cleaned = name.toLowerCase();

  for (const h of honorifics) {
    const regex = new RegExp(`\\b${h}\\.?\\b`, 'gi');
    cleaned = cleaned.replace(regex, '');
  }

  return cleaned.trim().replace(/\s+/g, ' ');
};

// Normalize names into word tokens
const normalizeAndSplit = name =>
  name
    .toLowerCase()
    .replace(/[^a-z\s.]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean);

// Levenshtein similarity
const stringSimilarity = (s1, s2) => {
  if (s1.length === 1 && s2.startsWith(s1)) {
    return 0.9;
  }
  if (s2.length === 1 && s1.startsWith(s2)) {
    return 0.9;
  }

  const distance = levenshteinDistance(s1, s2);
  const maxLength = Math.max(s1.length, s2.length);
  return 1 - distance / maxLength;
};

const levenshteinDistance = (a, b) => {
  const dp = Array(a.length + 1)
    .fill(null)
    .map(() => Array(b.length + 1).fill(0));

  for (let i = 0; i <= a.length; i++) {
    dp[i][0] = i;
  }
  for (let j = 0; j <= b.length; j++) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost,
      );
    }
  }

  return dp[a.length][b.length];
};
