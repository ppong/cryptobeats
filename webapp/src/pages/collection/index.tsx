import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import CollectionCard from "../../components/collection.card";
import { Track } from "../../components/context/application";
import { CollectionQuery } from "../../graphql/queries";

export const mockData: Track[] = [
  {
    albumCoverUrl: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    artist: "Jenny Steel",
    description: "Happy to share with you my debut album \"Feeling Colors\" wit...",
    title: "Feeling Colors",
    mediaUrl: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/shoptalk-clip.mp3',
  },
  {
    albumCoverUrl: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    artist: "Confetti",
    description: "Lightin' up Houston, Not my monkeys, Monday Mornings...",
    title: "Houston Tour",
    mediaUrl: 'https://ipfs.io/ipfs/bafybeidkinok24hq4j3aoqbpcwl4befibdlysvd764frmzhlwbxfshqsaa',
  },
  {
    albumCoverUrl: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    artist: "Juno",
    description: "This is list, Chances, No means NO. Funky Favlourts, NP, Made...",
    title: "WeekndVibes",
    mediaUrl: 'https://ipfs.io/ipfs/bafybeidkinok24hq4j3aoqbpcwl4befibdlysvd764frmzhlwbxfshqsaa',
  },
  {
    albumCoverUrl: "https://images.unsplash.com/photo-1480796927426-f609979314bd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    artist: "Hep & Burn",
    description: "These are our TOp 10 tracks for hanging in traffic jams, commut...",
    title: "Driving Around",
    mediaUrl: 'https://ipfs.io/ipfs/bafybeidkinok24hq4j3aoqbpcwl4befibdlysvd764frmzhlwbxfshqsaa',
  },
];

function CollectionPage() {
  const { loading, error, data } = useQuery(CollectionQuery, {
    variables: {
      'address': '0x47fb2aa5a070ded6f6e2414c601d7a80532dbb17'
    }
  });
  const [tracks, setTracks] = useState<Track[]>([])

  useEffect(() => {
    if (!data) { return }
    const promises: Promise<any>[] = data.user.collection.map((collectible) => {
      return fetch(collectible.metadataURI).then((res) => res.json())
    })
    Promise.all(promises).then((rawMetadata) => {
      const tracks: Track[] = rawMetadata.map((metadata, index) => {
        return {
          albumCoverUrl: metadata.body?.artwork?.info?.uri,
          artist: metadata.body?.artist,
          description: metadata.body?.notes,
          title: metadata.body?.title,
          mediaUrl: data.user.collection[index].contentURI
        }
      })
      const validTracks = tracks.filter((track) => {
        return track.albumCoverUrl && track.mediaUrl
      })
      setTracks(validTracks)
    })
  }, [data])

  if (loading || error || tracks.length === 0) {
    return null
  }

  const renderCollectionCards = () => {
    return tracks.map((track, index) => {
      // TODO: add ID later
      return (
        <CollectionCard
          key={index}
          track={track}
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

