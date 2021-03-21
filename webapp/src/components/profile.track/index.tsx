import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Track, useAppContext } from '../context/application';

type ProfileTrackProps = {
  track: Track;
}

function ProfileTrack(props: ProfileTrackProps) {
  const history = useHistory()
  const { isPlaying, togglePlayback, track, setTrack } = useAppContext();
  const { title, artist, duration, albumCoverUrl } = props.track;

  const [isMouseHover, setIsMouseHover] = useState(false)
  const handleSetTrack = (event) => {
    event.stopPropagation()
    if (isPlaying && track === props.track) { togglePlayback() }
    else setTrack(props.track);
  }

  const handleNavigateToSongPage = () => {
    setTrack(props.track);
    history.push({ pathname: '/song' })
  }

  return (
    <div
      onClick={handleNavigateToSongPage}
      onMouseEnter={() => setIsMouseHover(true)}
      onMouseLeave={() => setIsMouseHover(false)}
      className="flex h-auto w-full p-4 items-center max-w-lg"
    >
      <div
        className="flex justify-center items-center flex-none w-16 h-16 bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(${albumCoverUrl})`
        }}
      >
        {isMouseHover &&
          <div
            className='flex justify-center items-center rounded-full w-8 h-8 border-2 border-gray-50'
            onClick={handleSetTrack}
          >
            <FontAwesomeIcon className='text-gray-50' icon={isPlaying && track === props.track ? faPause : faPlay} size='1x' />
          </div>}
      </div>
      <div className="flex flex-1 flex-col w-auto ml-4">
        <div className="text-sm text-gray-300">
          {artist}
        </div>
        <div className="text-base">
          {title}
        </div>
      </div>
      <div className="text-base text-gray-300">
        {duration}
      </div>
    </div>
  )
}

export default ProfileTrack;
