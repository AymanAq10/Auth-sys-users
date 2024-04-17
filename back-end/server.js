const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/config');
const bodyParser = require('body-parser')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended:true
}))

app.use(cors());
app.use(express.json());

const url = process.env.url;
const dbName = process.env.dbName;
const _PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Connected to Database: ${dbName}`);
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

// Public route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// User routes
const userRoutes = require('./Routes/userRoutes');
app.use('/users', userRoutes);

// Start the Express server
app.listen(parseInt(_PORT), () => {
  console.log(`REST API via ExpressJs is running on port ${_PORT}`);
});

