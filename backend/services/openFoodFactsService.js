const axios = require('axios');

/**
 * Service to fetch product details from Open Food Facts API using a barcode.
 */
const fetchProductByBarcode = async (barcode) => {
  try {
    const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`, {
      headers: {
        'User-Agent': 'FoodSafe/1.0 (Integration Testing)'
      }
    });
    
    if (response.data.status === 1) {
      const product = response.data.product;
      
      // Extract relevant data safely
      const parsedData = {
        name: product.product_name || 'Unknown Product',
        brand: product.brands || 'Unknown Brand',
        ingredientsText: product.ingredients_text || '',
        ingredientsArray: product.ingredients 
          ? product.ingredients.map(i => i.text ? i.text.toLowerCase() : '').filter(Boolean) 
          : [],
        additivesArray: product.additives_tags 
          ? product.additives_tags.map(tag => tag.replace('en:', '').toUpperCase()) 
          : []
      };
      
      return parsedData;
    } else {
      // The product doesn't exist in their DB
      throw new Error('Product not found in Open Food Facts database. Matrix node empty.');
    }
  } catch (error) {
    console.error('OpenFoodFacts API Error:', error.message);
    
    // Pass along our custom throw, otherwise default to generic network error
    if (error.message.includes('Product not found')) {
      throw error;
    }
    throw new Error('Failed to establish link with Open Food Facts network.');
  }
};

module.exports = { fetchProductByBarcode };
