import React from "react";
import CollectionCard from "../../components/collection.card";

const mockData= {
  albumCover: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  artist: "Jenny Steel",
  description: "Happy to share with you my debut album \"Feeling Colors\" wit...",
  title: "Feeling Colors"
}


function CollectionPage() {
  return (
    <div className="grid grid-flow-col grid-cols-4 grid-rows-2 gap-4 p-4">
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
  );
}

export default CollectionPage;

