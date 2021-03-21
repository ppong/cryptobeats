import React from 'react';
import { gql, useQuery } from '@apollo/client';

import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ProfileTrack from '../../components/profile.track';

const CollectionQuery = gql`
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

function Profile() {
  const { loading, error, data } = useQuery(CollectionQuery);

  const renderProfileTracks = () => {
    return data.user.collection.map((item) => {
      const { id, metadataURI } = item;
      return <ProfileTrack key={id} metadataURI={metadataURI}/>
    });
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="grid grid-cols-2 grid-rows-1 gap-4 p-4 h-full items-center">
      <div className="flex flex-col justify-center">
        <div className="flex justify-center">
          <img className="h-80 w-80 rounded-full" src="https://images.unsplash.com/photo-1542931287-023b922fa89b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="" />
        </div>
        <div className="flex flex-col justify-center mt-10 items-center">
          <p className="text-base text-gray-300 text-center max-w-sm">Feeling Colors is available now exclusively on SoundCloud. Sign up to my newsletter to...</p>
          <button className="button mt-4 mr-4 px-4 py-2 rounded-full text-gray-50 shadow focus:outline-none">
            Follow
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex flex-col justify-center">
          <div
            className='shadow flex items-center'
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              width: 'fit-content',
            }}
          >
            <div className='px-2 py-1 text-2xl text-gray-300'>
              Jenny Steel
            </div>
            <FontAwesomeIcon className="mr-2 text-green-400 text-sm" icon={faCheckCircle}/>
          </div>
          <div
            className='mt-1 shadow'
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              width: 'fit-content',
            }}
          >
            <div className='px-2 py-1 text-sm text-gray-400'>
              Jen, London
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-4 divide-y divide-gray-400">
          {renderProfileTracks()}
        </div>
      </div>
    </div>
  );
}

export default Profile;
