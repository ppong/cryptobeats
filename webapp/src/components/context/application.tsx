import React, { createContext, ReactNode, useContext, useState } from 'react'

export const defaultBackground = 'https://images.unsplash.com/photo-1569982175971-d92b01cf8694?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'

interface IAppContext {
  title: string
  subTitle?: string
  setTitle: (title: string, subTitle?: string) => void
  backgroundImage: string
  setBackgroundImage: (background: string) => void
}

export const AppContext = createContext<IAppContext>({} as any)

interface IAppContextProviderProps {
  children: ReactNode
}

export function AppContextProvider(props: IAppContextProviderProps) {
  const [backgroundImage, setBackgroundImage] = useState(defaultBackground)
  const [title, setTitle] = useState('Cryptobeats')
  const [subTitle, setSubTitle] = useState<string | undefined>()
  const handleSetTitle = (title: string, subTitle?: string) => {
    setTitle(title)
    setSubTitle(subTitle)
  }

  const appContext = {
    title: title,
    subTitle: subTitle,
    setTitle: handleSetTitle,
    backgroundImage,
    setBackgroundImage,
  }
  return (
    <AppContext.Provider value={appContext}>
      {props.children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
