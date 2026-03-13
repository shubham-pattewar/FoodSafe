/**
 * Parses raw extracted text to find the ingredients list.
 * Normalizes and cleans the text into an array.
 */
const parseIngredients = (text) => {
  if (!text) return [];

  // Look for the "Ingredients:" or "Ingredients" keyword
  const ingredientsMatch = text.match(/ingredients:\s*(.*?)(?=\n\n|\n[A-Z][a-z]+:|$)/is) || 
                           text.match(/ingredients\s*(.*?)(?=\n\n|\n[A-Z][a-z]+:|$)/is);

  let rawIngredientsText = text;
  
  if (ingredientsMatch && ingredientsMatch[1]) {
    rawIngredientsText = ingredientsMatch[1];
  }

  // Clean the text: remove newlines, special chars, split by comma
  const cleanedText = rawIngredientsText.replace(/\n/g, ' ').replace(/\.$/, '');
  
  const ingredientsArray = cleanedText.split(',').map(item => {
    return item.trim().toLowerCase();
  }).filter(item => item.length > 0);

  return ingredientsArray;
};

module.exports = { parseIngredients };
