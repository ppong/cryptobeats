import React from "react";
import CollectionCard from "../../components/collection.card";

const mockData = [
  {
    albumCover: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    artist: "Jenny Steel",
    description: "Happy to share with you my debut album \"Feeling Colors\" wit...",
    title: "Feeling Colors"
  },
  {
    albumCover: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    artist: "Confetti",
    description: "Lightin' up Houston, Not my monkeys, Monday Mornings...",
    title: "Houston Tour"
  },
  {
    albumCover: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    artist: "Juno",
    description: "This is list, Chances, No means NO. Funky Favlourts, NP, Made...",
    title: "WeekndVibes"
  },
  {
    albumCover: "https://images.unsplash.com/photo-1480796927426-f609979314bd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    artist: "Hep & Burn",
    description: "These are our TOp 10 tracks for hanging in traffic jams, commut...",
    title: "Driving Around"
  },
];

function CollectionPage() {
  const renderCollectionCards = () => {
    return mockData.map((track) => {
      const {title, artist, description, albumCover} = track;

      // TODO: add ID later
      return(
        <CollectionCard
          albumCover={albumCover}
          artist={artist}
          title={title}
          description={description}
        />
      )
    });
  }

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
          {renderCollectionCards()}
        </div>
      </div>
    </div>
  );
}

export default CollectionPage;

