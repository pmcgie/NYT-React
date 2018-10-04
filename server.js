const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes")
const app = express();



// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Serve static content
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Promises with Mongoose
mongoose.Promise = Promise;

// Connect to MongoDB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/NYT-React"
);

// Using routes
app.use(routes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, function() {
  console.log("Server now listening to PORT");
});