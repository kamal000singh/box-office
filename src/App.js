import React from "react";
import { Switch, Route } from "react-router-dom";
import Nav from "./components/Nav.js";
import Home from "./pages/Home.js";
import Starred from "./pages/Starred.js";
function App() {
  return (
    <div>
      <Nav />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/starred">
          <Starred />
        </Route>
        <Route>ERROR:404 PAGE</Route>
      </Switch>
    </div>
  );
}

export default App;
