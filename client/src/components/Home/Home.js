import React, { Component } from "react";
import API from "../../utils/API";
import "./Home.css";

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
    else if (name==='clearAll') {
      this.setState({searchTerm: ''});
      this.setState({startYear: ''});
      this.setState({endYear: ''});
      this.setState({results: []});
      // not resetting
      // this.state.error = '';
    } 
  }

  handleSaveClick(headline, byline, web_url, pub_date) {
    console.log(pub_date);
    const articleData = {
      headline: headline,
      byline: byline,
      web_url: web_url,
      pub_date: pub_date
    }
    API.saveArticle(articleData)
       .then()
       .catch(err => console.log(err));
  }

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;
    //console.log(value);
    this.setState({
      [name]: value
    });
  };

  validateYear = (year) => {
    // regex for 4 digit number starting with 19 or 20
    const validYear = /^(19|20)\d{2}$/;
    // returns match if valid year, nothing if not
    return (year.match(validYear));
  }

  handleFormSubmit = event => {
    event.preventDefault();
    let searchQuery = this.state.searchTerm
    searchQuery = searchQuery.trim();
    if (!searchQuery) {
      alert('Please enter one or more words.');
      return;
    }
    if (this.state.startYear) {
      if (this.validateYear(this.state.startYear)) {
        searchQuery = `${searchQuery}&begin_date=${this.state.startYear}0101`;
      } else {
        alert('Invalid start year! Please input a valid four-digit year between 1900 and the present.');
        return;
      }
    }
    if (this.state.endYear) {
      if (this.validateYear(this.state.endYear)) {
        searchQuery = `${searchQuery}&end_date=${this.state.endYear}1231`;
      } else {
        alert('Invalid end year! Please input a valid four-digit year between 1900 and the present.');
        return;
      }
    }
    console.log(searchQuery);
    
    API.getArticles(searchQuery)
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res);
        }
        res.data.response.docs.forEach(function (doc) {
          if (doc.byline === undefined) {
            doc.byline = {original: 'No Byline'};
          }
         if (doc.pub_date === undefined) {
              doc.pub_date = 'Undated';
           }
        });
        this.setState({ results: res.data.response.docs, error: "" });
      })
      .catch(err => this.setState({ error: err.message }));
  };

  render() {
    return(
      <div className='container'>

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
                <form>

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
                  <div class="btn-group">
                    <button
                      type="submit"
                      onClick={this.handleFormSubmit}
                      className="btn btn-success searchbtn"
                      id="run-search"
                    >
                      <i className="fa fa-search pr-2"></i>
                      Search For It!
                    </button>
                    <button
                      value=''
                      name='clearAll'
                      onClick={this.handleClick}
                      type="button"
                      className="btn btn-secondary searchbtn"
                      id="clear-all"
                    >
                      <i className="fa fa-trash pr-2"></i>
                      Clear Results!
                    </button>
                  </div>
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

              {/* individual articles go in cards here */}
              <div className="card-body">
                {/* {console.log(this.state.results)} */}
                {this.state.results.map(result => (
                  // start of article card
                  <div className='row border-top border-bottom'>

                    <div className='col-sm-9 pt-2'>
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
                    {/* End of col-sm-9 */}
                    </div>

                    <div className='col-sm-3 d-flex align-items-center'>
                        <div className='btn-group vertical'>
                          <form>
                            <button
                              value={result.web_url}
                              name='viewArticle'
                              onClick={this.handleClick}
                              type="button"
                              className='btn articleBtn bg-success'
                            >
                              View Article
                            </button>
                          </form>
                        
                          <form>
                            <button
                              name='saveArticle'
                              onClick={() => this.handleSaveClick(result.headline.main, result.byline.original, result.web_url, result.pub_date)}
                              type="button"
                              className='btn articleBtn bg-primary'
                            >
                              Save Article
                            </button>
                          </form>
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