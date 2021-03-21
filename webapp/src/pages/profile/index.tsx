import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';

import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ProfileTrack from '../../components/profile.track';
import { CreationsQuery } from '../../graphql/queries';
import { getTracksFromCollectibles } from '../../components/track';
import { Track } from '../../components/context/application';
import MarcelImage from '../../images/marcel.jpeg'
import { useRouteMatch } from 'react-router-dom';

export const profileImageUrl = MarcelImage

interface IProfilePageParams {
  account: string
}

function Profile() {
  const match = useRouteMatch<IProfilePageParams>()
  const { loading, error, data } = useQuery(CreationsQuery, {
    variables: {
      'address': match.params.account
    }
  })
  const [tracks, setTracks] = useState<Track[]>([])

  useEffect(() => {
    if (!data?.user) { return }
    getTracksFromCollectibles(data.user.creations).then(tracks => {
      setTracks(tracks)
    })
  }, [data])

  const renderProfileTracks = () => {
    return tracks.map((track, index) => {
      return <ProfileTrack key={index} track={track} />
    });
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="grid grid-cols-2 grid-rows-1 gap-4 p-4 h-full items-center">
      <div className="flex flex-col justify-center">
        <div className="flex justify-center">
          <img className="h-80 w-80 rounded-full object-cover" src={profileImageUrl} alt="" />
        </div>
        <div className="flex flex-col justify-center mt-10 items-center">
          <p className="text-base text-gray-300 text-center max-w-sm">Feeling Colors is available now exclusively on SoundCloud. Sign up to my newsletter to...</p>
          <button className="button mt-4 mr-4 px-4 py-2 rounded-full text-gray-50 shadow focus:outline-none">
            Follow
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-center my-30">
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
            <FontAwesomeIcon className="mr-2 text-green-400 text-sm" icon={faCheckCircle} />
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
        <div className="flex flex-col mt-4 divide-y divide-gray-400"
          style={{ maxHeight: '50%vh' }}
        >
          {renderProfileTracks()}
        </div>
      </div>
    </div>
  );
}

export default Profile;
