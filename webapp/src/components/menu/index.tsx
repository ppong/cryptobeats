import React, { useState } from 'react';

function Menu() {
  const [isUserMenuActive, setIsUserMenuActive] = useState<boolean>(false);

  const toggleUserMenu = () => {
    setIsUserMenuActive(!isUserMenuActive);
  }

  return (
    <div>
      <div className="ml-4 flex items-center md:ml-6">
        <button className="bg-gray-50 p-1 rounded-full text-gray-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
          <span className="sr-only">View notifications</span>
          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>

        <div className="ml-3 relative z-10">
          <div>
            <button onClick={toggleUserMenu} type="button" className="max-w-xs rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu" aria-expanded="false" aria-haspopup="true">
              <img className="h-8 w-8 rounded-full" src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/383a8dde-b5da-4c0c-8a82-4b593c2dc66a/profile.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210319T213830Z&X-Amz-Expires=86400&X-Amz-Signature=457c5a46a6227a3e2f947e5de319a0622f7654f09ef1c18fcc38a64f71d5c891&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22profile.svg%22" alt=""/>
            </button>
          </div>
          { isUserMenuActive && (
            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
              <div className="block p-4 border-b-2 border-gray-200">
                <div className="text-xs text-gray-400">
                  0x47Fb...bb17
                </div>
                <p className="text-base text-gray-700">
                  0.002727 ETH
                </p>
              </div>
              <div className="block px-4 py-2 w-full text-sm text-left text-gray-700 hover:bg-gray-100">Your Profile</div>
              <div className="block px-4 py-2 w-full text-sm text-left text-gray-700 hover:bg-gray-100">Help Center</div>
              <div className="block px-4 py-2 w-full text-sm text-left text-gray-700 hover:bg-gray-100">Disconnect Wallet</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Menu;
