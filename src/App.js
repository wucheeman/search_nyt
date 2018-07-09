
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Saved from "./components/Saved";
import Home from "./components/Home";
// import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";

const App = () => (
  <Router>
    <div>
      <Navbar />
      <Wrapper>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/saved" component={Saved} />
        <div className='container'>
          {/* styles in App.css appear in 'search section */}

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
                    <input type="text" className="form-control" id="search-term" />
                  </div>

                  {/* number of records to retrieve*/}
                  <div className="form-group">
                    <label for="pwd">Number of Records to Retrieve:</label>
                    <select className="form-control" id="article-count">
                      <option value="1">1</option>
                      {/* Set 5 as default*/}
                      <option value="5" selected>5</option>
                      <option value="10">10</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label for="start-year">Start Year (Optional):</label>
                    <input type="text" class="form-control" id="start-year" />
                  </div>

                  <div className="form-group">
                    <label for="end-year">End Year (Optional):</label>
                    <input type="text" class="form-control" id="end-year" />
                  </div>

                  <button type="submit" className="btn btn-default" id="run-search">
                    <i class="fa fa-search"></i> Search</button>
                  <button type="button" class="btn btn-default" id="clear-all">
                    <i class="fa fa-trash"></i> Clear Results</button>

                  </form>
                {/* end of card body */}
                </div>
              {/* end of first card */}
              </div>

            {/* end of col-sm-12 */}
            </div>
          {/* end of row */}
          </div>
        {/* end of container */}
        </div> 
      </Wrapper>
      {/* <Footer /> */}
    </div>
  </Router>
);

export default App;