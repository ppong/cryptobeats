import React from 'react';
import { useAppContext } from '../context/application';

type CollectionCardProps = {
  albumCover: string;
  artist: string;
  title: string;
  description: string;
};

function CollectionCard(props: CollectionCardProps) {
  const { setTrack } = useAppContext(); 
  const { albumCover, artist, title, description } = props;

  const handleSetTrack = () => {
    setTrack(title, artist);
  }

  return (
    <div onClick={handleSetTrack} className="group flex rounded-md p-6 bg-gray-50 bg-opacity-10 items-center cursor-pointer hover:bg-gray-50 transform hover:scale-101 transition duration-300 ease-in-out">
      <div className="flex-none w-36 h-36">
        <img src={albumCover} alt="album cover" className="w-full h-full object-cover rounded-md" />
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
