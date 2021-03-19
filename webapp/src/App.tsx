import React from "react";
import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";

import { SongPage } from "./pages/song";
import CollectionPage from "./pages/collection";
import Header from './components/header';
import { AppContextProvider, useAppContext } from "./components/context/application";

export default function App() {
  return (
    <AppContextProvider>
      <RootRouter />
    </AppContextProvider>
  );
}

function Home() {
  return (
    <div>Home</div>
  )
}

function RootRouter() {
  const { backgroundImage } = useAppContext()
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
  )
}

