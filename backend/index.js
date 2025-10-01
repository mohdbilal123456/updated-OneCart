import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import authRoute from './routes/auth.Routes.js';
import productRoute from './routes/productRoute.js';
import cookieParser from "cookie-parser";
import cors from 'cors';
import userRoutes from './routes/userRoute.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());

//  Allowed origins (Netlify frontend)
const allowedOrigins = ["https://updated-one-cart.netlify.app"];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow Postman / server-to-server
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'CORS policy does not allow access from this origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

//  Preflight (for all OPTIONS requests)
app.options('*', cors());

// Routes
app.get("/", (req, res) => {
  res.send("Hello !!");
});

app.use('/api/auth', authRoute);
app.use('/api/product', productRoute);
app.use('/api/user', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);

// ✅ Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ success: false, message: err.message });
});

// Start server
app.listen(port, () => {
  console.log(` Server started at port ${port}`);
  connectDb();
});

