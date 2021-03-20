import React from 'react';

const albumCover = "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";

function ProfileTrack() {
  return (
    <div className="flex h-auto w-full p-4 items-center max-w-lg">
      <div className="w-16 h-16">
        <img src={albumCover} alt="album cover" className="w-full h-full object-cover rounded-md" />
      </div>
      <div className="flex flex-1 flex-col w-auto ml-4">
        <div className="text-sm text-gray-300">
          artist
        </div>
        <div className="text-base">
          title
        </div>
      </div>
      <div className="text-base text-gray-300">
        4:21
      </div>
    </div>
  )
}

export default ProfileTrack;
