import React from "react";
import CollectionCard from "../../components/collection.card";

const mockData = {
  albumCover: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  artist: "Jenny Steel",
  description: "Happy to share with you my debut album \"Feeling Colors\" wit...",
  title: "Feeling Colors"
}


function CollectionPage() {
  return (
    <div className='w-screen h-screen flex items-center'>
      <div className='flex'>
        <div className='ml-8 p-8 flex flex-col flex-none space-y-6'>
          <a className='text-lg text-gray-300'>
            Likes
        </a>
          <a className='text-lg text-white'>
            Playlists
        </a>
          <a className='text-lg text-gray-300'>
            Albumns
        </a>
          <a className='text-lg text-gray-300'>
            Recently played
        </a>
        </div>
        <div className="px-8 grid grid-cols-3 gap-4 overflow-hidden">
          <CollectionCard
            albumCover={mockData.albumCover}
            artist={mockData.artist}
            title={mockData.title}
            description={mockData.description}
          />
          <CollectionCard
            albumCover={mockData.albumCover}
            artist={mockData.artist}
            title={mockData.title}
            description={mockData.description}
          />
          <CollectionCard
            albumCover={mockData.albumCover}
            artist={mockData.artist}
            title={mockData.title}
            description={mockData.description}
          />
          <CollectionCard
            albumCover={mockData.albumCover}
            artist={mockData.artist}
            title={mockData.title}
            description={mockData.description}
          />
          <CollectionCard
            albumCover={mockData.albumCover}
            artist={mockData.artist}
            title={mockData.title}
            description={mockData.description}
          />
          <CollectionCard
            albumCover={mockData.albumCover}
            artist={mockData.artist}
            title={mockData.title}
            description={mockData.description}
          />
        </div>
      </div>
    </div>
  );
}

export default CollectionPage;

