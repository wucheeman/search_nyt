import React, { Component } from "react";
import API from "../../utils/API";
import "./Home.css";

// const Home = props => (

class Home extends Component {
  state = {
    searchTerm: '',
    results: [],
    error: ''
  };

  handleInputChange = event => {
    const searchTerm = event.target.value.trim()
    console.log('the search term is ' + searchTerm);
    this.setState({ searchTerm: searchTerm });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.getArticles(this.state.searchTerm)
      //  .then(console.log)
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res);
        }
        // TODO: delete when no longer useful
        // console.log(res.data.response.docs[0].headline.main);
        // console.log(res.data.response.docs[0].byline.original);
        // console.log(res.data.response.docs[0].pub_date);
        // console.log(res.data.response.docs[0].web_url);
        // console.log(res.data.response.docs);
        this.setState({ results: res.data.response.docs, error: "" });
      })
      .catch(err => this.setState({ error: err.message }));
  };

  render() {
    return(
      <div className='container'>

        {/* <!-- Jumbotron for Title --> */}
        <div className="jumbotron">
          <h1 className="text-center">
            <strong>
              <i className="fa fa-newspaper-o"></i> New York Times Search</strong>
          </h1>
        </div>

        {/* <!-- Row for Searching New York Times --> */}
        <div className="row">
          <div className="col-sm-12">
            <br />

            {/* <!-- First card is for handling the search parameters --> */}
            <div className="card">

              <div className="card-header">
                <h3 className="card-title">
                  <strong>
                    <i className="fa  fa-list-alt"></i> Search Parameters</strong>
                </h3>
              </div>

              <div className="card-body">
                {/* HTML Form for inputs */}
                {/* TODO: remove role=form; redundant and bad practice */}
                <form role="form">

                {/* the text box for search term */}
                <div className="form-group">
                  <label for="search">Search Term:</label>
                  <input
                    value={this.searchTerm}
                    onChange={this.handleInputChange}
                    type="text"
                    className="form-control"
                    id="search-term"
                  />
                </div>

                {/* TODO: delete */}
                {/* number of records to retrieve*/}
                {/* <div className="form-group">
                  <label for="pwd">Number of Records to Retrieve:</label>
                  <select className="form-control" id="article-count">
                    <option value="1">1</option> */}
                    {/* Set 5 as default*/}
                  {/*}  <option value="5" selected>5</option>
                    <option value="10">10</option>
                  </select>
                </div> */}

                <div className="form-group">
                  <label for="start-year">Start Year (Optional):</label>
                  <input type="text" className="form-control" id="start-year" />
                </div>

                <div className="form-group">
                  <label for="end-year">End Year (Optional):</label>
                  <input type="text" className="form-control" id="end-year" />
                </div>

                <button
                  type="submit"
                  onClick={this.handleFormSubmit}
                  className="btn btn-default"
                  id="run-search"
                >
                  <i className="fa fa-search"></i>
                  Search
                </button>
                <button type="button" className="btn btn-default" id="clear-all">
                  <i className="fa fa-trash"></i> Clear Results</button>

                </form>
              {/* end of card body */}
              </div>
            {/* end of first card */}
            </div>

          {/* end of col-sm-12 */}
          </div>
        {/* end of search card's row */}
        </div>

        {/* retrieved articles appear here */}
        <div className="row">
          <div className="col-sm-12">
            <br />

            {/* Top-level card for section */}
            <div className="card">
            
              <div className="card-header">
                <h3 className="card-title">
                  <strong>
                    <i className="fa fa-table"></i>
                    Top Articles
                  </strong>
                </h3>
              </div>

              {/* TODO: improve ID */}
              {/* individual articles go in cards here */}
              <div className="card-body" id="well-section">
                {/* {console.log(this.state.results)} */}
                {this.state.results.map(result => (
                  // start of article card
                  <div className='card' key={result.web_url}>
                    <h4>
                      <strong>
                        {result.headline.main}
                      </strong>
                    </h4>
                  {/* end of article card */}
                  </div>
                ))}

              {/* end of card-body */}
              </div>

            {/* end of top-level card */}
            </div>
          {/* end of col-sm-12 */}
          </div>
        {/* end of results row */}
        </div>

      {/* end of container */}
      </div> 
    ); // end of return
  } // end of render()
  
} // end of class declaration

export default Home;