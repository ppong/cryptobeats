import React, { useEffect, useState } from 'react';

type ProfileTrackProps = {
  metadataURI: string;
}

const getData = (url: string) => fetch(url)
  .then(response => response.json())
  .then(data => data);

function ProfileTrack(props: ProfileTrackProps) {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [duration, setDuration] = useState(-1);
  const [artwork, setArtwork] = useState('');
  const [isSucces, setIsSuccess] = useState(false);

  const { metadataURI } = props;

  useEffect(() => {
    async function getTrackData(){
      fetch(metadataURI)
        .then(response => response.json())
        .then(data => {
          const {body} = data;
          if (body) {
            const { title, artist, artwork, duration } = body;
            setIsSuccess(true);
            setTitle(title);
            setArtist(artist);
            setArtwork(artwork.info.uri);
            setDuration(duration);
          }
        });
    }
    getTrackData();
  }, [metadataURI]);

  if (!isSucces) {
    return <></>;
  }

  return (
    <div className="flex h-auto w-full p-4 items-center max-w-lg">
      <div className="w-16 h-16">
        <img src={artwork} alt="album cover" className="w-full h-full object-cover rounded-md" />
      </div>
      <div className="flex flex-1 flex-col w-auto ml-4">
        <div className="text-sm text-gray-300">
          {artist}
        </div>
        <div className="text-base">
          {title}
        </div>
      </div>
      <div className="text-base text-gray-300">
        {duration}
      </div>
    </div>
  )
}

export default ProfileTrack;
