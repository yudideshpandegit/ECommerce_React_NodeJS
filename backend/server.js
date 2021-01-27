import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import path from 'path';


import productRoutes from "./routes/productRoutes.js";
import UserRoutes from "./routes/userRoutes.js";
import OrderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadesRoutes.js';


import {notFound, errorHandler} from './middleware/errorMiddleware.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/products", productRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/orders", OrderRoutes);
app.use("/api/upload", uploadRoutes);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} on port ${process.env.PORT}`
      .yellow.bold
  );
});
