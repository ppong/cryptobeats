import { gql, useQuery } from '@apollo/client';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React, Web3ReactProvider } from '@web3-react/core';
import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route, Switch
} from "react-router-dom";
import { AppContextProvider, useAppContext } from "./components/context/application";
import { Footer } from "./components/footer";
import Header from './components/header';
import { Modal } from './components/modal';
import CollectionPage from "./pages/collection";
import { CreationPage } from './pages/creation';
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
  const { account } = useWeb3React()
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
            <Route path="/listen/:account">
              <CollectionPage />
            </Route>
            <Route path="/profile/:account">
              <ProfilePage />
            </Route>
            <Route path="/listen">
              <Redirect to={`/listen/${account || '0x47fb2aa5a070ded6f6e2414c601d7a80532dbb17'}`} />
            </Route>
            <Route path="/profile">
              <Redirect to={`/profile/${account || '0x47fb2aa5a070ded6f6e2414c601d7a80532dbb17'}`} />
            </Route>
            <Route path="/">
              <Redirect to={`/listen/${account || '0x47fb2aa5a070ded6f6e2414c601d7a80532dbb17'}`} />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  )
}

