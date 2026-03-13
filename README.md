# FoodSafe 🧪

FoodSafe is a comprehensive full-stack web application designed to help users analyze the healthiness of food products. By scanning barcodes or searching for products, users can get detailed nutritional breakdowns, safety scores, and additive analysis.

## 🚀 Features

-   **Live Barcode Scanning**: Use your camera to scan product barcodes for instant information.
-   **Nutritional Analysis**: Detailed breakdown of fats, sugars, proteins, and calories.
-   **Health Scoring**: Dynamic scoring system based on nutritional quality and additives.
-   **Product Comparison**: Compare multiple products side-by-side to make better choices.
-   **User Dashboard**: Personalized experience with history and saved scans.
-   **Modern Neon UI**: Sleek, high-performance interface with a premium green-neon theme.

## 🛠️ Technology Stack

### Frontend
-   **React 19**: Modern UI library with functional components and hooks.
-   **Vite**: Next-generation frontend tooling for fast builds.
-   **Tailwind CSS**: Utility-first CSS framework for custom styling.
-   **Framer Motion**: Smooth animations and transitions.
-   **Lucide React**: Beautiful, consistent iconography.
-   **ZXing**: Advanced barcode scanning library.
-   **Recharts**: Data visualization for nutritional metrics.

### Backend
-   **Node.js & Express**: Scalable server-side logic and RESTful API.
-   **MongoDB & Mongoose**: Flexible NoSQL database for product and user data.
-   **JWT (JSON Web Tokens)**: Secure authentication and authorization.
-   **Google Cloud Vision API**: Integrated for advanced scanning and image analysis.
-   **Multer**: Handling multipart/form-data for image uploads.

## 📂 Project Structure

```text
FoodSafe/
├── frontend/               # React + Vite frontend
│   ├── src/
│   │   ├── components/     # Reusable UI elements (Navbar, ScoreMeter)
│   │   ├── context/        # Global state (AuthContext)
│   │   ├── pages/          # Main views (Home, Scan, Dashboard)
│   │   └── services/       # API integration
│   └── tailwind.config.js
├── backend/                # Node.js + Express backend
│   ├── config/             # DB and Environment config
│   ├── controllers/        # Business logic for routes
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API endpoint definitions
│   └── server.js           # Entry point
└── README.md
```

## ⚙️ Installation & Setup

### Prerequisites
-   Node.js (v18+)
-   MongoDB instance

### 1. Clone the repository
```bash
git clone https://github.com/shubham-pattewar/FoodSafe.git
cd FoodSafe
```

### 2. Setup Backend
```bash
cd backend
npm install
# Create a .env file with:
# PORT=5000
# MONGO_URI=your_mongodb_uri
# JWT_SECRET=your_secret
# GOOGLE_APPLICATION_CREDENTIALS=path_to_key.json
npm run server
```

### 3. Setup Frontend
```bash
cd ../frontend
npm install
# Create a .env file with:
# VITE_API_URL=http://localhost:5000/api
npm run dev
```

## 📝 License
This project is for educational purposes. All rights reserved.
