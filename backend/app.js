require('dotenv').config();

// External Module
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Local Module
const errorController = require("./controllers/errorController");
const sellerRouter = require('./routers/sellerRouter');
const authRouter = require('./routers/authRouter');
const customerRouter = require('./routers/customerRouter');
const { isLoggedIn, isSeller, isCustomer } = require('./middleware/auth');
const MONGO_DB_URL =
  `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.xpg4d.mongodb.net/${process.env.MONGO_DB_DATABASE}`;

  // mongodb+srv://Keshav:Sharma%406008@cluster0.xpg4d.mongodb.net/?retryWrites=true&w=majority

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/seller', isLoggedIn, isSeller, sellerRouter);
app.use('/api/customer', isLoggedIn, isCustomer, customerRouter);
app.use(errorController.get404);

const PORT = process.env.PORT || 5173;
mongoose.connect(MONGO_DB_URL).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`);
  });
});