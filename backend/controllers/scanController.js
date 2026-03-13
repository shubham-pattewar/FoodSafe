const Product = require('../models/Product');
const Scan = require('../models/Scan');
const { extractTextFromImage } = require('../services/ocrService');
const { parseTextData } = require('../services/ingredientParser');
const { calculateAdvancedScore } = require('../services/scoringEngine');
const { fetchProductByBarcode } = require('../services/openFoodFactsService');

// @desc    Upload image, extract text, and analyze product
// @route   POST /api/scans/image
// @access  Private
const scanImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image uploaded' });
  }

  try {
    const imagePath = req.file.path;

    // 1. Image Preprocessing & OCR Extraction (via service)
    const ocrResult = await extractTextFromImage(imagePath);
    const extractedText = ocrResult.text;
    const confidenceScore = ocrResult.score;
    
    // 2. Text Cleaning, Detection & Extraction
    const parsedData = parseTextData(extractedText);
    const ingredients = parsedData.ingredients;
    const nutrition = parsedData.nutrition;
    
    // 10. Error Handling Fallback
    if (ingredients.length === 0) {
      return res.status(400).json({ 
        message: 'No ingredients found in the image. Please try a clearer picture or manually edit the ingredients.',
        extractedText,
        confidenceScore
      });
    }

    // Pass structured nutrition mapped to what calculateAdvancedScore expects (assuming 100g base for simplicity here)
    const nutritionalValues = {
      sugars_100g: nutrition.sugar ? parseFloat(nutrition.sugar) : 0,
      sodium_100g: nutrition.sodium ? parseFloat(nutrition.sodium) / 1000 : 0, // pass as grams, internal engine converts back to mg
    };

    // 3. Risk Detection Integration 
    const result = calculateAdvancedScore(ingredients, nutritionalValues);

    const product = await Product.create({
      name: 'Scanned Product', 
      ingredients,
      hiddenSugars: result.hiddenSugars,
      additives: result.additives,
      safetyScore: result.score,
      warnings: result.warnings
    });

    const scan = await Scan.create({
      userId: req.user._id,
      productId: product._id,
      scanData: result
    });

    // 8. Output Format
    res.status(201).json({
      product,
      scanId: scan._id,
      ingredients,
      nutrition,
      additives: result.additives,
      extractedText,
      confidenceScore
    });

  } catch (error) {
    console.error('Scan Error:', error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

// @desc    Scan barcode and analyze product
// @route   POST /api/scans/barcode
// @access  Private
const scanBarcode = async (req, res) => {
  const { barcode } = req.body;

  if (!barcode) {
    return res.status(400).json({ message: 'Barcode is required' });
  }

  try {
    // 1. Fetch data from OpenFoodFacts
    const data = await fetchProductByBarcode(barcode);
    
    const ingredients = data.ingredientsArray;
    
    if (ingredients.length === 0) {
      return res.status(400).json({ message: 'No ingredients found for this product in the database.' });
    }

    // 2. Calculate score 
    const nutritionalValues = {
      sugars_100g: data.nutriments?.sugars_100g || 0,
      sodium_100g: data.nutriments?.sodium_100g ? data.nutriments.sodium_100g / 1000 : 0
    };
    const result = calculateAdvancedScore(ingredients, nutritionalValues);

    // 3. Save or update product in DB
    const product = await Product.create({
      name: data.name,
      brand: data.brand,
      ingredients,
      hiddenSugars: result.hiddenSugars,
      additives: result.additives,
      safetyScore: result.score,
      warnings: result.warnings
    });

    // 4. Save scan history
    const scan = await Scan.create({
      userId: req.user._id,
      productId: product._id,
      scanData: result
    });

    res.status(201).json({ product, scanId: scan._id });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

// @desc    Get user's scan history
// @route   GET /api/scans
// @access  Private
const getUserScans = async (req, res) => {
  try {
    const scans = await Scan.find({ userId: req.user._id })
      .populate('productId')
      .sort({ createdAt: -1 });
      
    res.json(scans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { scanImage, scanBarcode, getUserScans };
