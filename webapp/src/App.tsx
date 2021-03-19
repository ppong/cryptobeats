import React from "react";
import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";

import { SongPage } from "./pages/song";
import CollectionPage from "./pages/collection";
import Header from './components/header';

const backgroundImage = 'https://images.unsplash.com/photo-1569982175971-d92b01cf8694?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'

export default function App() {
  return (
    <div 
      className='absolute inset-0 bg-center bg-no-repeat bg-cover'
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <Router>
        <Header />
        <Switch>
          <Route path="/song">
            <SongPage />
          </Route>
          <Route path="/collection">
            <CollectionPage />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

function Home() {
  return (
    <div>Home</div>
  )
}

