import { formatEther } from '@ethersproject/units';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useWeb3React } from '@web3-react/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CreationPage } from '../../pages/creation';
import { Modal } from '../modal';

function Menu() {
  const { account, library } = useWeb3React()

  const [isUserMenuActive, setIsUserMenuActive] = useState<boolean>(false);
  const [balance, setBalance] = useState<string>();
  const [showCreationModal, setShowCreationModal] = useState(false);

  useEffect((): any => {
    if (!account || !library) { return }
    library.getBalance(account)
      .then((balance: any) => {
        setBalance(balance)
      })
      .catch(() => {
        setBalance(undefined)
      })
    return () => {
      setBalance(undefined)
    }
  }, [account, library]) // ensures refresh if referential identity of library doesn't change across chainIds

  const toggleUserMenu = () => {
    setIsUserMenuActive(!isUserMenuActive);
  }

  return (
    <div>
      <div className="ml-4 flex items-center md:ml-6">
        <button
          className="bg-gray-50 rounded-full h-6 w-6 text-gray-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white text-center"
          onClick={() => setShowCreationModal(true)}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>

        <div className="ml-3 relative z-10">
          <div>
            <button onClick={toggleUserMenu} type="button" className="max-w-xs rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu" aria-expanded="false" aria-haspopup="true">
              <img className="h-8 w-8 rounded-full" src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/383a8dde-b5da-4c0c-8a82-4b593c2dc66a/profile.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210319T213830Z&X-Amz-Expires=86400&X-Amz-Signature=457c5a46a6227a3e2f947e5de319a0622f7654f09ef1c18fcc38a64f71d5c891&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22profile.svg%22" alt="" />
            </button>
          </div>
          {isUserMenuActive && (
            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
              <div className="block p-4 border-b-2 border-gray-200">
                <div className="text-xs text-gray-400">
                  {`${account!.substring(0, 6)}...${account!.substring(account!.length - 4)}`}
                </div>
                <p className="text-base text-gray-700">
                  {balance ? `${formatEther(balance)} ETH` : ''}
                </p>
              </div>
              <Link to="/profile" className="block px-4 py-2 w-full text-sm text-left text-gray-700 hover:bg-gray-100">Your Profile</Link>
              <div className="block px-4 py-2 w-full text-sm text-left text-gray-700 hover:bg-gray-100">Help Center</div>
              <div className="block px-4 py-2 w-full text-sm text-left text-gray-700 hover:bg-gray-100">Disconnect Wallet</div>
            </div>
          )}
        </div>
      </div>
      {showCreationModal &&
        <Modal>
          <CreationPage />
        </Modal>}
    </div>
  );
}

export default Menu;
