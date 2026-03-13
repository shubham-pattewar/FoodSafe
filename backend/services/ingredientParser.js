/**
 * Normalizes ingredient names for variations.
 */
const normalizeIngredient = (name) => {
  let normalized = name.trim();
  // Case normalization
  normalized = normalized.charAt(0).toUpperCase() + normalized.slice(1).toLowerCase();
  
  // Specific replacements
  if (normalized.toLowerCase() === 'msg' || normalized.toLowerCase() === 'monosodium glutamate') {
    return 'Monosodium Glutamate';
  }
  if (normalized.toLowerCase() === 'ins 211' || normalized.toLowerCase() === 'sodium benzoate') {
    return 'E211';
  }
  return normalized;
};

/**
 * Text Cleaning Phase
 * Remove special chars, correct spaces, fix 0/O and 1/l OCR misreads
 */
const cleanText = (text) => {
  let cleaned = text
    .replace(/[^a-zA-Z0-9\s.,:%()/-]/g, '') // Remove unwanted special chars
    .replace(/\s+/g, ' '); // Correct spacing errors

  // Fix common OCR zero O
  cleaned = cleaned.replace(/\b([A-Za-z]+)0([A-Za-z]*)\b/g, '$1O$2');
  cleaned = cleaned.replace(/\b([A-Za-z]*)0([A-Za-z]+)\b/g, '$1O$2');
  // Fix common OCR 1 l
  cleaned = cleaned.replace(/\b([A-Za-z]+)1([A-Za-z]*)\b/g, '$1l$2');
  cleaned = cleaned.replace(/\b([A-Za-z]*)1([A-Za-z]+)\b/g, '$1l$2');

  return cleaned;
};

/**
 * Extract Nutrition Values
 */
const extractNutrition = (text) => {
  const nutrition = {};

  const caloriesMatch = text.match(/Calories\s*[:\-]?\s*(\d+)/i);
  if (caloriesMatch) nutrition.calories = parseInt(caloriesMatch[1], 10);

  const sugarMatch = text.match(/Sugars?\s*[:\-]?\s*(\d+\s*g)/i);
  if (sugarMatch) nutrition.sugar = sugarMatch[1].replace(/\s+/g, '');

  const fatMatch = text.match(/Fat\s*[:\-]?\s*(\d+\s*g)/i);
  if (fatMatch) nutrition.fat = fatMatch[1].replace(/\s+/g, '');

  const sodiumMatch = text.match(/Sodium\s*[:\-]?\s*(\d+\s*mg)/i);
  if (sodiumMatch) nutrition.sodium = sodiumMatch[1].replace(/\s+/g, '');
  
  const proteinMatch = text.match(/Protein\s*[:\-]?\s*(\d+\s*g)/i);
  if (proteinMatch) nutrition.protein = proteinMatch[1].replace(/\s+/g, '');

  const fiberMatch = text.match(/Fiber\s*[:\-]?\s*(\d+\s*g)/i);
  if (fiberMatch) nutrition.fiber = fiberMatch[1].replace(/\s+/g, '');

  return nutrition;
};

/**
 * Parses raw extracted text to find the ingredients list and nutritional structure.
 */
const parseTextData = (text) => {
  if (!text) return { ingredients: [], nutrition: {} };

  const cleanedText = cleanText(text);

  // Ingredient Detection
  const ingredientsMatch = cleanedText.match(/ingredients:\s*(.*?)(?=\n\n|\n[A-Z][a-z]+:|$|Nutrition Facts)/is) || 
                           cleanedText.match(/ingredients\s*(.*?)(?=\n\n|\n[A-Z][a-z]+:|$|Nutrition Facts)/is);

  let rawIngredientsText = '';
  if (ingredientsMatch && ingredientsMatch[1]) {
    rawIngredientsText = ingredientsMatch[1];
  } else {
    // Attempt fallback just using entire text if very short and seems like ingredients
    if (cleanedText.length < 500 && cleanedText.includes(',')) {
      rawIngredientsText = cleanedText;
    }
  }

  // Remove trailing period and map split parts
  const ingredientsArray = rawIngredientsText.replace(/\.$/, '').split(',')
    .map(item => normalizeIngredient(item))
    .filter(item => item.length > 0);

  // Deduplicate ingredients logic
  const uniqueIngredients = [...new Set(ingredientsArray)];

  // Nutrition Extraction
  const nutrition = extractNutrition(cleanedText);

  return { ingredients: uniqueIngredients, nutrition, cleanedText };
};

// Backwards compatibility for the parser
module.exports = { parseIngredients: (text) => parseTextData(text).ingredients, parseTextData };
