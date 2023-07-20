import React from "react";
import { Route } from "react-router-dom";
import DetailPage from "./views/detailPage/DetailPage";
import FormPage from "./views/formPage/FormPage";
import HomePage from "./views/homePage/HomePage";
import LandingPage from "./views/landingPage/LandingPage"

function App() {

  return (
    <div className="App">
      <Route exact path ="/" component={LandingPage} />
      <Route exact path ="/home" component={HomePage} />
      <Route exact path ="/detail" component={DetailPage} />
      <Route exact path ="/create" component={FormPage} />
    </div>
  );
}

export default App;
