import { useWeb3React } from '@web3-react/core';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import useCallback from '../hooks/use-callback';
import Menu from '../menu';
import { injected } from '../wallet/connectors';

const getSignMessage = (address) => {
  return `Welcome to Cryptobeats!

  Click "Sign" to sign in. No password needed!
  
  I accept the Cryptobeats Terms of Service: https://Cryptobeats.xyz/tos
  
  Wallet address:
  ${address}`
}

export function ConnectWalletButton() {
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false);
  const { activate, account, library } = useWeb3React()

  // have to do this to fix closure issue with hooks
  const handleSignIn = useCallback(() => {
    library.getSigner(account)
      .signMessage(getSignMessage(account))
      .then((signature: any) => {
        setIsWalletConnected(true)
      })
      .catch((error: any) => {
        window.alert('Failure!' + (error && error.message ? `\n\n${error.message}` : ''))
      })
  })
  const handleActivate = () => {
    activate(injected).then(() => {
      handleSignIn()
    })
  }
  if (isWalletConnected) {
    return <Menu />;
  }
  return (
    <button
      className="button mr-4 px-4 py-2 rounded-full text-gray-50 shadow focus:outline-none"
      onClick={handleActivate}
    >
      Connect Wallet
    </button>
  );
}

function Header() {

  return (
    <div className="absolute top-0 flex justify-between w-full h-20 p-4 items-center z-10">
      <Link to="/home">
        <div className="flex justify-center items-center">
          <img className="h-8 w-auto sm:h-10" src="https://logoipsum.com/logo/logo-14.svg" alt="logo" />
          <h1 className="-ml-2 text-sm text-gray-50 font-semibold">CRYPTOBEATS</h1>
        </div>
      </Link>
      <div className='text-gray-400 space-x-8'>
        <NavLink
          className='py-2'
          activeClassName='text-gray-50 border-b-2 border-white'
          to='/home'
        >
          Home
        </NavLink>
        <NavLink
          className='py-2'
          activeClassName='text-gray-50 border-b-2 border-white'
          to='/listen'
        >
          Listen
        </NavLink>
        <NavLink
          className='py-2'
          activeClassName='text-gray-50 border-b-2 border-white'
          to='/discover'
        >
          Discover
        </NavLink>
      </div>
      <div className="flex items-center justify-end">
        <ConnectWalletButton />
      </div>
    </div>
  );
}

export default Header;
