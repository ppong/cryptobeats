import React from "react";
import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';

import { AppContextProvider, useAppContext } from "./components/context/application";
import { Footer } from "./components/footer";
import Header from './components/header';
import { Modal } from './components/modal';

import CollectionPage from "./pages/collection";
import { CreationPage } from './pages/creation';
import { SongPage } from "./pages/song";
import ProfilePage from './pages/profile';

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

export default function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <AppContextProvider>
        <RootRouter />
      </AppContextProvider>
    </Web3ReactProvider>
  );
}

function Home() {
  return (
    <div></div>
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
        <Footer />
        <Switch>
          <Route path="/song">
            <SongPage />
          </Route>
          <Route path="/collection">
            <CollectionPage />
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
      {/*<Modal>
        <CreationPage />
      </Modal>*/}
    </div>
  )
}

