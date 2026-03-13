const path = require('path');
const axios = require('axios');
const sharp = require('sharp');
const fs = require('fs');

/**
 * Image Preprocessing Phase
 * Prepares the image for optimal OCR extraction.
 */
const preprocessImage = async (imagePath) => {
  const absImagePath = path.resolve(imagePath);
  const processedImagePath = path.join(path.dirname(absImagePath), 'processed-' + path.basename(absImagePath));

  try {
    await sharp(absImagePath)
      .resize({ width: 2000, withoutEnlargement: true })
      .grayscale()
      .normalize()
      .sharpen()
      .toFile(processedImagePath);

    return processedImagePath;
  } catch (err) {
    console.error('Sharp preprocessing failed, using original image:', err.message);
    return absImagePath;
  }
};

/**
 * Calls the Google Cloud Vision REST API using an API key from .env
 * This avoids needing a JSON service account file or ADC setup.
 */
const callVisionAPI = async (imageFilePath) => {
  const apiKey = process.env.GOOGLE_VISION_API_KEY;

  if (!apiKey || apiKey === 'mock-key-for-now') {
    console.warn('[OCR] No valid GOOGLE_VISION_API_KEY set. Using MOCK OCR data fallback.');
    return {
      text: `Ingredients: Wheat Flour, Sugar, Palm Oil, Cocoa Mass, Whole Milk Powder, Maltodextrin, Salt, E621, E102, Natural Flavors.`,
      score: 0.95,
      isMock: true
    };
  }

  const imageBuffer = fs.readFileSync(imageFilePath);
  const base64Image = imageBuffer.toString('base64');

  const requestBody = {
    requests: [
      {
        image: { content: base64Image },
        features: [{ type: 'TEXT_DETECTION', maxResults: 1 }],
      },
    ],
  };

  const url = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;
  const response = await axios.post(url, requestBody);

  const annotations = response.data.responses?.[0]?.textAnnotations;
  if (annotations && annotations.length > 0) {
    return { text: annotations[0].description, score: 0.95, isMock: false };
  }
  return { text: '', score: 0, isMock: false };
};

/**
 * Main service: preprocess the image, then call OCR.
 */
const extractTextFromImage = async (imagePath) => {
  let processedImagePath = null;
  try {
    processedImagePath = await preprocessImage(imagePath);
    const result = await callVisionAPI(processedImagePath);

    if (processedImagePath !== path.resolve(imagePath) && fs.existsSync(processedImagePath)) {
      fs.unlinkSync(processedImagePath);
    }

    return result;
  } catch (error) {
    if (processedImagePath && fs.existsSync(processedImagePath)) {
      try { fs.unlinkSync(processedImagePath); } catch (_) {}
    }
    console.error('OCR Extraction Error:', error.message);

    // Fallback for any uncaught failure
    return {
      text: `Ingredients: Wheat Flour, Sugar, Palm Oil, Cocoa Mass, Whole Milk Powder, Maltodextrin, Salt, E621, E102, Natural Flavors.`,
      score: 0.5,
      isMock: true
    };
  }
};

module.exports = { extractTextFromImage };
