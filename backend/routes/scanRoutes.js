const express = require('express');
const router = express.Router();
const { scanImage, scanBarcode, getUserScans } = require('../controllers/scanController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/').get(protect, getUserScans);
router.route('/image').post(protect, upload.single('image'), scanImage);
router.route('/barcode').post(protect, scanBarcode);

module.exports = router;
