import { ApolloClient, InMemoryCache } from '@apollo/client';
import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { ApolloProvider } from '@apollo/client';

export const defaultBackground = 'https://images.unsplash.com/photo-1569982175971-d92b01cf8694?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'

const graphqlUri = 'https://api.thegraph.com/subgraphs/name/ourzora/zora-v1-rinkeby'
// const graphqlUri = 'https://api.thegraph.com/subgraphs/name/ourzora/zora-v1'
const client = new ApolloClient({
  uri: graphqlUri,
  cache: new InMemoryCache()
});

// from https://stackoverflow.com/a/47686478
const useAudio = (): any => {
  const [audio, setAudio] = useState<HTMLAudioElement>()
  const [isPlaying, setPlaying] = useState<boolean>(false);

  const togglePlayback = () => setPlaying(!isPlaying);

  useEffect(() => {
    isPlaying ? audio?.play() : audio?.pause();
  }, [audio, isPlaying]);

  useEffect(() => {
    audio?.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio?.removeEventListener('ended', () => setPlaying(false));
    }
  }, [audio])
  return [audio, isPlaying, togglePlayback, setAudio, setPlaying];
}

export interface Track {
  title: string
  artist: string
  description: string
  albumCoverUrl: string
  mediaUrl: string
}

interface IAppContext {
  track?: Track
  setTrack: (track: Track) => void
  isPlaying: boolean,
  togglePlayback: () => void
  backgroundImage: string
  setBackgroundImage: (background: string) => void
}

export const AppContext = createContext<IAppContext>({} as any)

interface IAppContextProviderProps {
  children: ReactNode
}

export function AppContextProvider(props: IAppContextProviderProps) {
  const [backgroundImage, setBackgroundImage] = useState(defaultBackground)
  const [track, setTrack] = useState<Track>()
  const [audio, isPlaying, togglePlayback, setAudio, setPlaying] = useAudio();

  const handleSetTrack = (newTrack: Track) => {
    if (audio) { audio.pause() }
    setTrack(newTrack)
    setAudio(new Audio(newTrack.mediaUrl))
    setPlaying(true)
  }

  const appContext = {
    track: track,
    setTrack: handleSetTrack,
    isPlaying,
    togglePlayback,
    backgroundImage,
    setBackgroundImage,
  }
  return (
    <ApolloProvider client={client}>
      <AppContext.Provider value={appContext}>
        {props.children}
      </AppContext.Provider>
    </ApolloProvider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
