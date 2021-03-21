import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Track, useAppContext } from '../context/application';

type CollectionCardProps = {
  track: Track
};

function CollectionCard(props: CollectionCardProps) {
  const history = useHistory()
  const { isPlaying, togglePlayback, track, setTrack } = useAppContext();
  const { title, artist, description, albumCoverUrl } = props.track;

  const [isMouseHover, setIsMoseHover] = useState(false)
  const handleSetTrack = (event) => {
    event.stopPropagation()
    if (isPlaying) { togglePlayback() }
    setTrack(props.track);
  }

  const handleNavigateToSongPage = () => {
    setTrack(props.track);
    history.push({ pathname: '/song' })
  }

  return (
    <div
      onClick={handleNavigateToSongPage}
      onMouseEnter={() => setIsMoseHover(true)}
      onMouseLeave={() => setIsMoseHover(false)}
      className="group flex rounded-md p-6 bg-gray-50 bg-opacity-10 items-center cursor-pointer hover:bg-gray-50 transform hover:scale-101 transition duration-300 ease-in-out"
    >
      <div
        className="flex justify-center items-center flex-none w-36 h-36 bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(${albumCoverUrl})`
        }}
      >
        {isMouseHover &&
          <div
            className='flex justify-center items-center rounded-full w-16 h-16 border-2 border-gray-50'
            onClick={handleSetTrack}
          >
            <FontAwesomeIcon className='text-gray-50' icon={isPlaying && track === props.track ? faPause : faPlay} size='1x' />
          </div>}
      </div>
      <div className="flex-auto ml-6">
        <div className="flex flex-wrap">
          <p className="w-full flex-nonetext-sm font-medium text-gray-300 mt-2 group-hover:text-gray-500">
            {artist}
          </p>
          <h1 className="flex-auto truncate text-gray-50 text-xl font-semibold group-hover:text-gray-900">
            {title}
          </h1>
        </div>
        <p className="text-sm text-gray-300 group-hover:text-gray-500">
          {description}
        </p>
      </div>
    </div>
  );
}

export default CollectionCard;
