const { detectSugars } = require('./sugarDetector');
const { detectAdditives } = require('./additiveDetector');

/**
 * Calculates safety score and warnings based on rules.
 * 
 * Rules:
 * - Start score = 100
 * - Hidden sugar -> minus 10 points each
 * - Additive -> minus 5 points each
 * - Sugar > 10g -> minus 15 points (If exact amount available, mock currently)
 * - Sodium > 500mg -> minus 10 points (If exact amount available, mock currently)
 * 
 * @param {Array<String>} ingredients - Parsed ingredients
 * @param {Object} nutritionalValues - (Optional) Nutritional data if fetched via OpenFoodFacts
 */
const calculateScore = (ingredients, nutritionalValues = {}) => {
  let score = 100;
  const warnings = [];

  const sugarResult = detectSugars(ingredients);
  const additiveResult = detectAdditives(ingredients);

  // Hidden sugars deduction (10 points each)
  if (sugarResult.count > 0) {
    score -= (sugarResult.count * 10);
    warnings.push(`${sugarResult.count} hidden sugar(s) detected.`);
  }

  // Additives deduction (5 points each)
  if (additiveResult.count > 0) {
    score -= (additiveResult.count * 5);
    warnings.push(`${additiveResult.count} synthetic additive(s) found.`);
  }

  // Nutritional limits (If data provided by OpenFoodFacts or mock)
  const sugarAmount = nutritionalValues.sugars_100g || 0;
  const sodiumAmount = nutritionalValues.sodium_100g || 0;

  if (sugarAmount > 10) {
    score -= 15;
    warnings.push('High sugar content (>10g/100g).');
  }

  // Convert sodium (g) to mg for check
  const sodiumMg = sodiumAmount * 1000;
  if (sodiumMg > 500) {
    score -= 10;
    warnings.push('High sodium content (>500mg/100g).');
  }

  // Ensure minimum score is 0
  score = Math.max(0, score);

  return {
    score,
    hiddenSugars: sugarResult.list,
    additives: additiveResult.list,
    warnings
  };
};

module.exports = { calculateScore };
