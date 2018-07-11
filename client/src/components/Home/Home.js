import React, { Component } from "react";
import API from "../../utils/API";
import "./Home.css";

// const Home = props => (

class Home extends Component {
  state = {
    searchTerm: '',
    startYear: '',
    endYear: '',
    results: [],
    error: ''
  };

  handleClick = event => {
    let value = event.target.value;
    const name = event.target.name;
    // console.log(name, value);
    if (name==='viewArticle') {
      window.open(value, '_blank');
    }
    else if (name==='saveArticle') {
      console.log('Need to save the article');
    }
    else if (name==='clearAll') {
      this.setState({searchTerm: ''});
      this.setState({startYear: ''});
      this.setState({endYear: ''});
      this.setState({results: []});
      // not resetting
      // this.state.error = '';
    } 
 
  }

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;
    console.log(value);
    // TODO: add validation for startYear and endYear
    // if (name === "password") {
    //   value = value.substring(0, 15);
    // }
    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    // console.log(this.state.searchTerm, this.state.startYear, this.state.endYear);
    let searchQuery = this.state.searchTerm
    if (this.state.startYear) {
      searchQuery = `${searchQuery}&begin_date=${this.state.startYear}0101`;
    }
    if (this.state.endYear) {
      searchQuery = `${searchQuery}&end_date=${this.state.endYear}1231`;
    }
    console.log(searchQuery);
    
    API.getArticles(searchQuery)
      //  .then(console.log)
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res);
        }
        res.data.response.docs.forEach(function (doc) {
          // console.log(doc.byline);
          if (doc.byline === undefined) {
            doc.byline = {original: 'No Byline'};
            // console.log(doc.byline);
          }
         if (doc.pub_date === undefined) {
              doc.pub_date = 'Undated';
              // console.log(doc.pub_date);
          }
        });
        // TODO: delete when no longer useful
        // console.log(res.data.response.docs[9].headline.main);
        // console.log(res.data.response.docs[9].byline.original);
        // console.log(res.data.response.docs[9].pub_date);
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
        {/* <div className="jumbotron">
          <h1 className="text-center">
            <strong>
              <i className="fa fa-newspaper-o"></i> New York Times Search</strong>
          </h1>
        </div> */}

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
                      value={this.state.searchTerm}
                      name='searchTerm'
                      onChange={this.handleInputChange}
                      type="text"
                      className="form-control"
                      id="search-term"
                    />
                  </div>

                  <div className="form-group">
                    <label for="start-year">Start Year (Optional):</label>
                    <input
                      value={this.state.startYear}
                      name='startYear'
                      onChange={this.handleInputChange}
                      type="text"
                      className="form-control"
                      id="start-year"
                    />
                  </div>

                  <div className="form-group">
                    <label for="end-year">End Year (Optional):</label>
                    <input
                      value={this.state.endYear}
                      name='endYear'
                      onChange={this.handleInputChange}
                      type="text"
                      className="form-control"
                      id="end-year" />
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
                </form>
                <form>
                  <button
                    value=''
                    name='clearAll'
                    onClick={this.handleClick}
                    type="button"
                    className="btn btn-default"
                    id="clear-all"
                  >
                    <i className="fa fa-trash"></i>
                    Clear Results
                  </button>
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
                  <div className='row'>

                    <div className='col-sm-8'>
                      {/* start of content card */}
                      {/* TODO: delete key value? doesn't seem to work */}
                      <div className='card' key={result.web_url}>
                        <h4>
                          <strong>
                            {result.headline.main}
                          </strong>
                        </h4>
                        <h6>
                          {result.byline.original}
                        </h6>
                        <h6>
                          {result.pub_date}
                        </h6>
                       {/* end of content card */}
                      </div>
                    {/* End of col-sm-8 */}
                    </div>

                    <div className='col-sm-4'>
                      {/* start of button card */}
                      <div className='card' key={result.web_url}>
                        <div className='btn-group vertical'>
                          <form>
                            <button
                              value={result.web_url}
                              name='viewArticle'
                              onClick={this.handleClick}
                              type="button"
                              className='btn'
                            >
                              View Article
                            </button>
                          </form>
                          <form>
                            <button
                              value='TBD'
                              name='saveArticle'
                              onClick={this.handleClick}
                              type="button"
                              className='btn'
                            >
                              Save Article
                            </button>
                          </form>
                        </div>
                      {/* end of button card */}
                      </div>
                    {/* end of col-sm-4 */}
                    </div>

                {/* end of article row */}
                </div>
                // end of .map
                ))} 

              {/* end of top-level card-body */}
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