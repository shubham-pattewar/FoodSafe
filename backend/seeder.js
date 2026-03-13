const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');
const Scan = require('./models/Scan');
const bcrypt = require('bcryptjs');
const { calculateScore } = require('./services/scoringEngine');

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Scan.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Existing DB data cleared.');

    // Create a demo user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const demoUser = await User.create({
      name: 'Demo User',
      email: 'demo@example.com',
      password: hashedPassword // directly setting to prevent hooks interference if any
    });

    console.log('Demo User Created: demo@example.com / password123');

    // Create a dummy product
    const ingredients = ['sugar', 'wheat flour', 'palm oil', 'E621'];
    const result = calculateScore(ingredients);

    const sampleProduct = await Product.create({
      name: "Chocolate Biscuits",
      brand: "Sample Brand",
      ingredients,
      hiddenSugars: result.hiddenSugars,
      additives: result.additives,
      safetyScore: result.score,
      warnings: result.warnings
    });

    console.log('Sample Product Created');

    // Create a scan
    await Scan.create({
      userId: demoUser._id,
      productId: sampleProduct._id,
      scanData: result
    });

    console.log('Sample Scan History Created');
    
    console.log('Data Import SUCCESS');
    process.exit();
  } catch (error) {
    console.error('Error importing data: ', error);
    process.exit(1);
  }
};

importData();
