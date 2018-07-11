import axios from "axios";

// Export an object containing methods for searching the Times, etc the Dog.Ceo API

export default {
  getArticles: function(searchTerm) {
    const searchQuery = (
      "https://api.nytimes.com/svc/search/v2/articlesearch.json" + 
      "?api-key=b9f91d369ff59547cd47b931d8cbc56b:0:74623931" +
      "&q=" + searchTerm
    );
    // TODO: add support for search on timeframe
    //  if the user provides a startYear, include it in the queryURL
    // var startYear = $("#start-year").val().trim();
  
    // if (parseInt(startYear)) {
    //   queryURL += "&begin_date=" + startYear + "0101";
    // }
  
    // // if the user provides an endYear, include it in the queryURL
    // var endYear = $("#end-year").val().trim();
  
    // if (parseInt(endYear)) {
    //   queryURL += "&end_date=" + endYear + "0101";
    // }


    return axios.get(searchQuery);
  }
  // getRandomDog: function() {
  //   return axios.get("https://dog.ceo/api/breeds/image/random");
  // },
  // getDogsOfBreed: function(breed) {
  //   return axios.get("https://dog.ceo/api/breed/" + breed + "/images");
  // },
  // getBaseBreedsList: function() {
  //   return axios.get("https://dog.ceo/api/breeds/list");
  // }
};
