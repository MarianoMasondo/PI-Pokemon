import React from "react";
import { Route, useLocation } from "react-router-dom";
import DetailPage from "./views/detailPage/DetailPage";
import FormPage from "./views/formPage/FormPage";
import HomePage from "./views/homePage/HomePage";
import LandingPage from "./views/landingPage/LandingPage"
import NavBar from "./components/navBar/NavBar";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar />}
      <Route exact path ="/" component={LandingPage} />
      <Route exact path ="/home" component={HomePage} />
      <Route exact path ="/detail/:id" component={DetailPage} />
      <Route exact path ="/create" component={FormPage} /> 
    </div>
  );
}

export default App;
