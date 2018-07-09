
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import Discover from "./pages/Discover";
// import About from "./pages/About";
// import Search from "./pages/Search";
import Navbar from "./components/Navbar";
import Saved from "./components/Saved";
// placeholder until I understand requirement
import Placeholder from "./components/Placeholder";
// import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";

const App = () => (
  <Router>
    <div>
      <Navbar />
      <Wrapper>
        {/* <Route exact path="/" component={About} /> */}
        {/* <Route exact path="/about" component={About} /> */}
        <Route exact path="/placeholder" component={Placeholder} />
        <Route exact path="/saved" component={Saved} />
      </Wrapper>
      {/* <Footer /> */}
    </div>
  </Router>
);

export default App;