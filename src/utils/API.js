import axios from "axios";

export default {
  
  getArticles: function(topic, beginDate, endDate) {
    
    // API query components less dates
    const baseURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
    const Key = "api-key=20a42ddb30c640478da2a6b7bdf74412";
    
    const queryURL = baseURL + Key + "&q=" + topic + "&begin_date=" + beginDate + "0101&end_date=" + endDate + "0101";

    return axios.get(queryURL);

  },

  saveArticle: function(newArticle) {
    return axios.post("/api/saved", newArticle);
  },
  
  getSavedArticles: function() {
    return axios.get("/api/saved");
  },
  
  deleteArticle: function(ID) {
    return axios.delete("/api/saved/" + ID);
  }

};