// This file will be very, very wet!

import React, { Component } from "react";
import API from "../../utils/API";
import "./Saved.css";

class Saved extends Component {
  // TODO: state not yet edited from Home.js
  state = {
    searchTerm: '',
    startYear: '',
    endYear: '',
    results: [],
    error: ''
  };

  // TODO: not yet edited from Home.js
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

  // TODO: not yet edited from Home.js
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

  // TODO: not yet edited from Home.js
  // TODO: delete?
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
        this.setState({ results: res.data.response.docs, error: "" });
      })
      .catch(err => this.setState({ error: err.message }));
  };

  // TODO: not yet edited from Home.js
  render() {
    return(
      <div className='container'>

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
                    Saved Articles
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

export default Saved;