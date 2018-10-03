const mongoose = require("mongoose");
const Schema = mongoose.Schema

// Mongo Model
const ArticleSchema = new Schema({
    title: {type: String, required: true},
    date: {type: String, default: true},
    url: {type: String,required: true}
})
  
// Generate Model
const Article = mongoose.model('Article', ArticleSchema);
  
// Export Model
module.exports = Article;