import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppContext } from '../context/application';



export function Footer() {
  const { track, isPlaying, togglePlayback } = useAppContext();

  if (!track) {
    return null
  }
  return (
    <div className='absolute bottom-10 w-full'>
      <div className='flex justify-center items-center'>
        <div className='my-16 flex items-center'>
          <div onClick={togglePlayback} className='flex justify-center items-center rounded-full w-16 h-16 border-2 border-gray-50'>
            <FontAwesomeIcon className='text-gray-50' icon={isPlaying ? faPause : faPlay} size='1x' />
          </div>
          <div className='ml-4'>
            <div className='text-gray-300'>
              {track.artist}
            </div>
            <div className='text-lg text-gray-50'>
              {track.title}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
