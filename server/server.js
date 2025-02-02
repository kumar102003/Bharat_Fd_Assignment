const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const faqRoutes = require("./routes/faqRoute");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

app.use("/api/faqs", faqRoutes);

app.get('/', (req, res) => {
    res.send('<h1> Welcome to FAQ API </h1>');
});
app.get('/health', (req, res) => {
    res.send('<h1> Every thing is Good Here! </h1>');
});


mongoose
  .connect(
    process.env.MONGO_URI,
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
