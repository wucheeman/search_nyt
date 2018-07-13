import React from "react";
import Jumbotron from "../Jumbotron";

const NoMatch = () => (
  <div className='container'>
  <div className="row">
    <div className="col-sm-12 text-center">
        {/* <Jumbotron> */}
          <h1>404</h1>
          <h2>This is not the web page you were looking for</h2>
          <h1>
            <span role="img" aria-label="Face With Rolling Eyes Emoji">
              🙄
            </span>
          </h1>
        {/* </Jumbotron> */}
      </div>
    </div>
  </div>
);

export default NoMatch;
