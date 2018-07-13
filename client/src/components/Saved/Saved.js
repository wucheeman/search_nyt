// This file is very wet!

import React, { Component } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import "./Saved.css";

class Saved extends Component {
  state = {
    articles: [], // will be array of saved articles
    id: "",
    headline: "",
    byline: "",
    web_url: "",
    pub_date: "" // Mongo represents as Date; 
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

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadSaved())
      .catch(err => console.log(err));
  };


  handleClick = event => {
    let value = event.target.value;
    const name = event.target.name;
    if (name==='viewArticle') {
      window.open(value, '_blank');
    }
    else if (name==='deleteArticle') {
      this.deleteArticle(value);
    }
  }

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
                {this.state.articles.map(article => (
                  // start of article card
                  <div className='row border-top border-bottom'>

                    <div className='col-sm-9 pt-2'>
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
                    {/* End of col-sm-9 */}
                    </div>

                    <div className='col-sm-3 d-flex align-items-center'>
                        <div className='btn-group vertical'>
                          <form>
                            <button
                              value={article.web_url}
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
                              value={article._id}
                              name='deleteArticle'
                              onClick={this.handleClick}
                              type="button"
                              className='btn articleBtn bg-danger'
                            >
                              Delete Article
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

export default Saved;