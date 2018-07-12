import axios from "axios";

// Export an object containing methods for searching the Times, etc the Dog.Ceo API

export default {
  getArticles: function(searchTerm) {
    const searchQuery = (
      "https://api.nytimes.com/svc/search/v2/articlesearch.json" + 
      "?api-key=b9f91d369ff59547cd47b931d8cbc56b:0:74623931" +
      "&q=" + searchTerm
    );
    return axios.get(searchQuery);
  },
  // gets all saved articles
  getSaved: function() {
    return axios.get("/api/articles");
  },
  // Saves a article to the database
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  },
    // Deletes the book with the given id
    deleteArticle: function(id) {
      return axios.delete("/api/articles/" + id);
    }

};
