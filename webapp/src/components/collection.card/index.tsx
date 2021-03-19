import React from 'react';

type CollectionCardProps = {
  albumCover: string;
  artist: string;
  title: string;
  description: string;
};

function CollectionCard(props: CollectionCardProps) {
  const { albumCover, artist, title, description } = props;

  return (
    <div className="group flex p-6 bg-gray-50 bg-opacity-10 items-center hover:bg-gray-50 transform hover:scale-101 transition duration-300 ease-in-out">
      <div className="flex-none w-36 h-36">
        <img src={albumCover} alt="album cover" className="w-full h-full object-cover" />
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
