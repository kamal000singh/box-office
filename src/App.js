import React from "react";
import { Switch, Route } from "react-router-dom";
function App() {
  return (
    <Switch>
      <Route exact path="/">
        <h1>This is Page 1</h1>
      </Route>
      <Route exact path="/about">
        <h1>This is About Page</h1>
      </Route>
      <Route>ERROR:404 PAGE</Route>
    </Switch>
  );
}

export default App;
