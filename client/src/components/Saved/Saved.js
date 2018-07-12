// This file will be very, very wet!

import React, { Component } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import "./Saved.css";

class Saved extends Component {
  state = {
    // TODO: delete
    // searchTerm: '',
    // startYear: '',
    // endYear: '',
    // results: [],
    // error: ''
    articles: [], // will be array of saved articles
    headline: "",
    byline: "",
    web_url: "",
    pub_date: "" // Mongo represents as Date; probably string is fine
  };

  componentDidMount() {
    this.loadSaved();
  }

  loadSaved = () => {
    API.getSaved()
      .then(res =>
        this.setState({ articles: res.data })
      )
      .catch(err => console.log(err));
  };

// TODO add method for deleting article


  // TODO: not yet edited from Home.js
  // view article should be same; other button should be delete
  // clearAll can be deleted
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
  // TODO: partially (?) edited from Home.js
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
                {/* {console.log(this.state.articles)} */}
                {this.state.articles.map(article => (
                  // start of article card
                  <div className='row'>

                    <div className='col-sm-8'>
                      {/* start of content card */}
                      {/* TODO: delete key value? doesn't seem to work */}
                      <div className='card' key={article.web_url}>
                        <h4>
                          <strong>
                            {article.headline}
                          </strong>
                        </h4>
                        <h6>
                          {article.byline}
                        </h6>
                        <h6>
                          {article.pub_date}
                        </h6>
                       {/* end of content card */}
                      </div>
                    {/* End of col-sm-8 */}
                    </div>

                    <div className='col-sm-4'>
                      {/* start of button card */}
                      <div className='card' key={article.web_url}>
                        <div className='btn-group vertical'>
                          <form>
                            <button
                              value={article.web_url}
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