const SUGAR_ALIASES = [
  'sugar', 'cane sugar', 'brown sugar', 'maltose', 'dextrose', 
  'fructose', 'glucose syrup', 'corn syrup', 'high fructose corn syrup',
  'maltodextrin', 'sucrose', 'agave nectar', 'honey', 'maple syrup',
  'molasses', 'invert sugar', 'fruit juice concentrate'
];

/**
 * Detects hidden sugars in an array of ingredients.
 * @param {Array<String>} ingredients - List of parsed ingredients.
 * @returns {Object} - Result containing count and list of found sugars.
 */
const detectSugars = (ingredients) => {
  if (!ingredients || !Array.isArray(ingredients)) {
    return { count: 0, list: [] };
  }

  const foundSugars = [];

  ingredients.forEach(ingredient => {
    // Check if the ingredient matches or includes any sugar alias
    const hasSugar = SUGAR_ALIASES.some(alias => 
      ingredient.toLowerCase().includes(alias)
    );

    if (hasSugar && !foundSugars.includes(ingredient)) {
      foundSugars.push(ingredient);
    }
  });

  return {
    count: foundSugars.length,
    list: foundSugars
  };
};

module.exports = { detectSugars };
