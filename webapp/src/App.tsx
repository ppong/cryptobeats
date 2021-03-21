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

const ExampleGraphqlQuery = gql`
{
  user(id: "0x47fb2aa5a070ded6f6e2414c601d7a80532dbb17") {
    collection {
      id
      creator {
        id
      }
      contentURI
      metadataURI
    }
  }
}`

function Home() {
  const { loading, error, data } = useQuery(ExampleGraphqlQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.user.collection.map((item) => (
    <div key={item.id}>
      {JSON.stringify(item, null, 2)}
    </div>
  ));
}


