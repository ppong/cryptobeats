import React from "react";
import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";
import { SongPage } from "./page/song";


export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/song">
          <SongPage />
        </Route>
        <Route path="/collection">
          <Collection />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

function Collection() {
  return (
    <div>Collection</div>
  )
}

function Home() {
  return (
    <div>Home</div>
  )
}

