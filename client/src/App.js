
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import Saved from "./components/Saved";
import Home from "./components/Home";
import NoMatch from "./components/NoMatch";
// import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";

const App = () => (
  <Router>
    <div>
      <Navbar />
      <Jumbotron />
      <Wrapper>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/saved" component={Saved} />
          <Route component={NoMatch} />
        </Switch>
      </Wrapper>
      {/* <Footer /> */}
    </div>
  </Router>
);

export default App;