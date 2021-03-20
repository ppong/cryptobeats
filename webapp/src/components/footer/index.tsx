import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

import { useAppContext } from '../context/application';

// from https://stackoverflow.com/a/47686478
const useAudio = (url: string): [boolean, () => void] => {
  const [audio] = useState(new Audio(url));
  const [isPlaying, setPlaying] = useState<boolean>(false);

  const togglePlayback = () => setPlaying(!isPlaying);

  useEffect(() => {
    isPlaying ? audio.play() : audio.pause();
  }, [audio, isPlaying]);

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    }
  })

  return [isPlaying, togglePlayback];
}

export function Footer() {
  const { title, artist } = useAppContext();
  const [isPlaying, togglePlayback] = useAudio('https://ipfs.io/ipfs/bafybeidkinok24hq4j3aoqbpcwl4befibdlysvd764frmzhlwbxfshqsaa');

  return (
    <div className='absolute bottom-0 w-full'>
      <div className='flex justify-center items-center'>
        <div className='my-16 flex items-center'>
          <div onClick={togglePlayback} className='flex justify-center items-center rounded-full w-16 h-16 border-2 border-gray-50'>
            <FontAwesomeIcon className='text-gray-50' icon={isPlaying ? faPause : faPlay} size='1x' />
          </div>
          <div className='ml-4'>
            <div className='text-gray-300'>
              {artist}
            </div>
            <div className='text-lg text-gray-50'>
              {title}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
