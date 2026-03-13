const Product = require('../models/Product');
const Scan = require('../models/Scan');
const { extractTextFromImage } = require('../services/ocrService');
const { parseIngredients } = require('../services/ingredientParser');
const { calculateScore } = require('../services/scoringEngine');
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

    // 1. Extract text via OCR
    const extractedText = await extractTextFromImage(imagePath);
    
    // 2. Parse ingredients list
    const ingredients = parseIngredients(extractedText);
    
    if (ingredients.length === 0) {
      return res.status(400).json({ message: 'No ingredients found in the image. Please try a clearer picture.' });
    }

    // 3. Calculate score
    const result = calculateScore(ingredients);

    // 4. Save product to DB
    const product = await Product.create({
      name: 'Scanned Product', // Default name, user might update it later
      ingredients,
      hiddenSugars: result.hiddenSugars,
      additives: result.additives,
      safetyScore: result.score,
      warnings: result.warnings
    });

    // 5. Save scan history
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

    // 2. Calculate score (could use nutritional values if fetched)
    const result = calculateScore(ingredients);

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
