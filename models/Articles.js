const mongoose = require("mongoose");
const Schema = mongoose.Schema

// Mongo Model
const ArticleSchema = new Schema({
    title: {type: String, required: true},
    date: {type: Date, default: Date.now},
    url: {type: String,required: true}
})
  
// Generate Model
const Article = mongoose.model('Article', ArticleSchema);
  
// Export Model
module.exports = Article;