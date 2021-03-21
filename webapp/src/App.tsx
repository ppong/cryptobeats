import { gql, useQuery } from '@apollo/client';
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import React from "react";
import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";
import { AppContextProvider, useAppContext } from "./components/context/application";
import { Footer } from "./components/footer";
import Header from './components/header';
import CollectionPage from "./pages/collection";
import ProfilePage from './pages/profile';
import { SongPage } from "./pages/song";



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

function RootRouter() {
  const { backgroundImage } = useAppContext()
  return (
    <div
      className='absolute inset-0 bg-center bg-no-repeat bg-cover'
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className='w-full h-full'
        style={{
          backdropFilter: 'blur(8px)',
        }}
      >
        <Router>
          <Header />
          <Footer />
          <Switch>
            <Route path="/song">
              <SongPage />
            </Route>
            <Route path="/listen">
              <CollectionPage />
            </Route>
            <Route path="/profile">
              <ProfilePage />
            </Route>
            <Route path="/">
              <CollectionPage />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  )
}

