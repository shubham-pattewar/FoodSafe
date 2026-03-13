const { detectSugars } = require('./sugarDetector');
const { detectAdditives } = require('./additiveDetector');

/**
 * Calculates an advanced safety score based on non-linear formulation.
 * 
 * @param {Array<String>} ingredients - Parsed ingredients list
 * @param {Object} nutritionalValues - Nutritional data (e.g. from OpenFoodFacts)
 * @returns {Object} Containing the final score, detected lists, and warnings.
 */
const calculateAdvancedScore = (ingredients, nutritionalValues = {}) => {
  let score = 100;
  const warnings = [];

  // Input Variables
  const I_total = ingredients && Array.isArray(ingredients) ? ingredients.length : 0;
  
  // Assume values are in grams. Converting sodium to mg.
  const N_s = nutritionalValues.sugars_100g || 0;
  const N_na = (nutritionalValues.sodium_100g || 0) * 1000;

  const sugarResult = detectSugars(ingredients);
  const I_hs = sugarResult.count;
  
  const additiveResult = detectAdditives(ingredients);
  const I_sa = additiveResult.count;

  // 2. Processing Penalty
  const penaltyProc = 5 * Math.log(I_total + 1);
  score -= penaltyProc;

  // Populate warnings for UI
  if (I_hs > 0) warnings.push(`${I_hs} hidden sugar(s) detected.`);
  if (I_sa > 0) warnings.push(`${I_sa} synthetic additive(s) found.`);

  // 3. Weighted Sugar Penalty
  if (I_hs > 0) {
    const penaltySugar = (I_hs * 8) * (1 + (N_s / 50));
    score -= penaltySugar;
  }

  // 4. Additive Penalty
  const penaltyAdd = I_sa * 6;
  score -= penaltyAdd;

  // 5. Critical Thresholds
  if (N_s > 25) {
    score -= 10;
    warnings.push('Critical: High sugar content (>25g/100g).');
  }

  if (N_na > 1000) {
    score -= 10;
    warnings.push('Critical: High sodium content (>1000mg/100g).');
  }

  // 6. Floor and Round
  const finalScore = Math.max(0, Math.round(score));

  return {
    score: finalScore,
    hiddenSugars: sugarResult.list,
    additives: additiveResult.list,
    warnings
  };
};

module.exports = { calculateScore: calculateAdvancedScore, calculateAdvancedScore };
