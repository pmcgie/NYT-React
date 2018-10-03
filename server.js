const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes")
const app = express();


// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('*', (req, res) => {
  res.json('stopping here')
})
// Serve static content
app.use(express.static('./client/build/index.html'));

// Using routes
app.use(routes);

// Promises with Mongoose
mongoose.Promise = Promise;

// Connect to MongoDB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/NYT-React"
);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log("Server now listening to PORT");
});