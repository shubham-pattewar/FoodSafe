/**
 * Detects synthetic additives using E numbers (e.g., E100 – E999).
 * @param {Array<String>} ingredients - List of parsed ingredients.
 * @returns {Object} - Result containing count and list of found additives.
 */
const detectAdditives = (ingredients) => {
  if (!ingredients || !Array.isArray(ingredients)) {
    return { count: 0, list: [] };
  }

  const foundAdditives = [];
  
  // Regular expression to match E numbers (E followed by 3 or 4 digits)
  // Matching E100 to E1599 typically
  const eNumberRegex = /\bE[1-9]\d{2,3}\b/i;

  ingredients.forEach(ingredient => {
    const match = ingredient.match(eNumberRegex);
    if (match && !foundAdditives.includes(match[0].toUpperCase())) {
      foundAdditives.push(match[0].toUpperCase());
    }
  });

  return {
    count: foundAdditives.length,
    list: foundAdditives
  };
};

module.exports = { detectAdditives };
