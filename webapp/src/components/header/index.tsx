import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const connectWallet = () => {
    console.log('connecting wallet...');
  }

  return (
    <div className="flex w-full h-20 p-4 items-center">
      <Link to="/home">
        <div className="flex justify-center items-center">
          <img className="h-8 w-auto sm:h-10" src="https://logoipsum.com/logo/logo-14.svg" alt="logo"/>
          <h1 className="text-gray-50 font-bold">Cryptobeats</h1>
        </div>
      </Link>
      <div className="flex items-center justify-end flex-1">
        <button onClick={connectWallet} className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md text-base font-medium text-black bg-gray-50 hover:bg-gray-100">
          Connect Wallet
        </button>
      </div>
    </div>
  );
}

export default Header;
