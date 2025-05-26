import express from 'express';
import cors from 'cors';
import fs from 'fs';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes autoload
// Read all files in the routes directory and import them
fs.readdirSync('./routes').forEach(async (r) => {
  const route = await import(`./routes/${r}`);
  app.use('/api', route.default); // Ensure `default` export
});

// Database connection

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1); // Exit the process with failure
  }
}
connectDB();




//test route

app.get('/api/', (req, res) => {
  res.send(`Welcome to the Hotel Booking Server,`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});