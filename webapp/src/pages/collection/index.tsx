import { useQuery } from "@apollo/client";
import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router";
import CollectionCard from "../../components/collection.card";
import { Track } from "../../components/context/application";
import { getTracksFromCollectibles } from "../../components/track";
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

interface ICollectionRouteParams {
  account: string
}

function CollectionPage() {
  const match = useRouteMatch<ICollectionRouteParams>()
  const { loading, error, data } = useQuery(CollectionQuery, {
    variables: {
      'address': match.params.account
    }
  });
  const [tracks, setTracks] = useState<Track[]>([])

  useEffect(() => {
    if (!data) { return }
    getTracksFromCollectibles(data.user.collection).then(tracks => {
      setTracks(tracks)
    })
  }, [data])

  const collectionData = tracks.length === 0 ? mockData : tracks
  return (
    <div className='w-screen h-screen flex items-center'>
      <div className='flex w-full h-full'>
        <div className='ml-8 p-8 flex flex-col justify-center flex-none space-y-6'>
          <a className='text-lg text-white'>
            Collection
          </a>
          <a className='text-lg text-gray-300'>
            Likes
          </a>
          <a className='text-lg text-gray-300'>
            Playlists
          </a>
          <a className='text-lg text-gray-300'>
            Albumns
          </a>
        </div>
        <div className='flex items-center w-full h-full overflow-x-auto'>
          <div className="flex collection">
            {collectionData.map((track, index) => {
              return (
                <CollectionCard
                  key={index}
                  track={track}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollectionPage;

