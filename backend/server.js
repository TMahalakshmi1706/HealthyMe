const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

console.log("Mongo URI:", process.env.MONGODB_URI); 

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.log('❌ MongoDB connection error:', err));


const authRoutes = require('./routes/auth');

app.get('/', (req, res) => {
  res.json({ message: 'Smart Prescription API is running!' });
});

app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
