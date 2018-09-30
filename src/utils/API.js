import axios from "axios";

const api = {
  
  getArticles: function(topic, startYear, endYear) {
    
    // API query components less dates
    const baseURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
    const Key = "api-key=20a42ddb30c640478da2a6b7bdf74412";
    
    const queryURL = baseURL + Key + "&q=" + topic + "&begin_date=" + startYear + "0101&end_date=" + endYear + "1231";

    console.log(queryURL);

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

export default api;