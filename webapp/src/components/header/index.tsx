import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import Menu from '../menu';

function Header() {
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false);

  const connectWallet = () => {
    console.log('connecting wallet...');
  }

  const renderActionPanel = () => {
    if (isWalletConnected) {
      return <Menu />;
    }
    return (
      <button
        className="button mr-4 px-4 py-2 rounded-full text-gray-50 shadow focus:outline-none"
        onClick={connectWallet}
      >
        Connect Wallet
      </button>
    );
  }

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
          to='/collection'
        >
          Collection
        </NavLink>
        <NavLink
          className='py-2'
          activeClassName='text-gray-50 border-b-2 border-white'
          to='/market'
        >
          Market
        </NavLink>
      </div>
      <div className="flex items-center justify-end">
        {renderActionPanel()}
      </div>
    </div>
  );
}

export default Header;
