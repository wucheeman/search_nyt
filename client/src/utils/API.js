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
  getSaved: function() {
    return axios.get("/api/articles");
  } // added trailing comma when next function added

};
