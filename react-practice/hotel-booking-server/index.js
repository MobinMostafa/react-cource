import express from 'express';
import cors from 'cors';
import fs from 'fs';
import dotenv from 'dotenv';
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



app.get('/api/', (req, res) => {
  res.send(`Welcome to the Hotel Booking Server,`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});