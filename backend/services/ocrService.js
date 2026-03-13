const path = require('path');
// const vision = require('@google-cloud/vision');
// Initialize a client (Uncomment when keyfile is available)
// const client = new vision.ImageAnnotatorClient();

/**
 * Service to extract text using Google Cloud Vision API.
 * Currently uses a mock process to simulate the API call.
 */
const extractTextFromImage = async (imagePath) => {
  try {
    // ==== REAL IMPLEMENTATION (Uncomment and configure key to use) ====
    // const [result] = await client.textDetection(imagePath);
    // const detections = result.textAnnotations;
    // return detections.length > 0 ? detections[0].description : '';

    // ==== MOCK IMPLEMENTATION ====
    console.log(`Mock OCR process running for image: ${imagePath}`);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Return sample text that mimics an OCR response for testing
    return `
    Nutrition Facts
    Serving Size 1 bar (40g)
    Ingredients: Wheat Flour, Sugar, Palm Oil, Cocoa Mass, Whole Milk Powder, 
    Maltodextrin, Salt, E621, E102, Natural Flavors.
    Contains: Wheat, Milk.
    `;
  } catch (error) {
    console.error('OCR Error:', error);
    throw new Error('Failed to extract text from image');
  }
};

module.exports = { extractTextFromImage };
