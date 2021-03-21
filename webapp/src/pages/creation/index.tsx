import { faImage } from '@fortawesome/free-regular-svg-icons';
import { faFileImage, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useWeb3React } from '@web3-react/core';
import {
  constructBidShares,
  constructMediaData,

  generateMetadata, sha256FromBuffer, Zora
} from '@zoralabs/zdk';
import ipfsCore from 'ipfs-core';
import React, { useState } from 'react';
import { profileImageUrl } from '../profile';


const profilePictureImage = 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29'
const collectibleImage = 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29'

const IPFS_URL_PREFIX = "https://ipfs.io/ipfs/";

let ipfs: any = null;

const arrayBufferToBufferCycle = (ab) => {
  var buffer = new Buffer(ab.byteLength);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buffer.length; ++i) {
    buffer[i] = view[i];
  }
  return buffer;
}

export function CreationPage() {
  const [albumCoverFile, setAlbumCoverFile] = useState<string | ArrayBuffer | null>();
  const [albumCoverPreview, setAlbumCoverPreview] = useState<string>();
  const [mp3File, setMp3File] = useState<string | ArrayBuffer | null>();
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [description, setDescription] = useState('');

  const { library } = useWeb3React();

  const handleDescription = e => {
    const newDescription = e.target.value;
    setDescription(newDescription);
  }

  const handleTitle = e => {
    const newTitle = e.target.value;
    setTitle(newTitle);
  }

  const handleArtist = e => {
    const newArtist = e.target.value;
    setArtist(newArtist);
  }

  const handleAlbumCover = async (e) => {
    e.preventDefault();

    const file = e.target.files[0];

    const reader = new window.FileReader();

    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      setAlbumCoverFile(reader.result);
      console.log('image done loading');
    }

    const previewReader = new window.FileReader();
    previewReader.readAsDataURL(file)
    previewReader.onloadend = () => {
      setAlbumCoverPreview(previewReader.result as string);
    }
  }

  const handleMp3 = async (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);

    reader.onloadend = () => {
      setMp3File(reader.result);
      console.log(reader.result);
      console.log('mp3 done loading');
    }
  }

  const handleMint = async () => {
    if (!ipfs) {
      ipfs = await ipfsCore.create();
    }
    const mp3URL = IPFS_URL_PREFIX + (await ipfs.add(mp3File as any)).cid.toString();
    const albumCoverURL = IPFS_URL_PREFIX + (await ipfs.add(albumCoverFile as any)).cid.toString();

    const signer = library.getSigner();
    const zora = new Zora(signer, 4)
    const metadataJSON = generateMetadata('catalog-20210202', {
      body: {
        version: 'catalog-20210202',
        title,
        artist,
        notes: description,
        duration: 1,
        mimeType: 'audio/aiff',
        trackNumber: null,
        project: null,
        artwork: {
          isNft: false,
          info: {
            uri: albumCoverURL,
            mimeType: 'image/jpeg'
          },
          nft: null
        },
        visualizer: null,
      },
      origin: null
    });

    const metadataURL = IPFS_URL_PREFIX + (await ipfs.add(metadataJSON)).cid.toString();
    const contentHash = sha256FromBuffer(arrayBufferToBufferCycle(mp3File));
    const metadataHash = sha256FromBuffer(Buffer.from(metadataJSON))
    const mediaData = constructMediaData(
      mp3URL,
      metadataURL,
      contentHash,
      metadataHash
    );
    console.log(mediaData);

    const bidShares = constructBidShares(
      10, // creator share
      90, // owner share
      0 // prevOwner share
    )
    const tx = await zora.mint(mediaData, bidShares)
    await tx.wait(8)
  }

  return (
    <div
      className='absolute w-screen h-screen flex bg-white z-10'
    >
      <div className='flex-1 flex justify-center items-center bg-black'>
        <CollectibleCard
          image={albumCoverPreview}
          artist={artist}
          title={title}
        />
      </div>
      <div className='flex-1 flex justify-center items-center'>
        <div className='flex flex-col'>
          <div className='text-3xl font-semibold'>
            Create Your Music Collectible
          </div>
          <div className='mt-2 text-gray-600'>
            Turn your music into a unique and fun digital experience
          </div>

          <div className="mt-8">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              className="mt-1 px-3 py-2 w-full rounded-md border border-gray-300"
              value={title}
              onChange={handleTitle}
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Artist</label>
            <input
              type="text"
              className="mt-1 px-3 py-2 w-full rounded-md border border-gray-300"
              value={artist}
              onChange={handleArtist}
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              className="mt-1 px-3 py-2 w-full rounded-md border border-gray-300"
              value={description}
              onChange={handleDescription}
            />
          </div>

          <div className="mt-4 max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border rounded-md">
            <div className="space-y-1 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-gray-900 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                  <span>Upload Album Cover</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleAlbumCover} />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
          <div className="mt-4 max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border rounded-md">
            <div className="space-y-1 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-gray-900 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                  <span>Upload Audio File</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleMp3} />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">
                MP3 up to 10MB
              </p>
            </div>
          </div>

          <button onClick={handleMint} className='mt-8 px-3 py-3 w-full rounded-full bg-black text-white shadow'>
            Create
          </button>
        </div>
      </div>
    </div >
  )
}

interface ICollectionCardProps {
  image?: string
  artist: string
  title: string
}
export function CollectibleCard(props: ICollectionCardProps) {
  const { image, artist, title } = props
  return (
    <div className='w-96'>
      <div className='flex-none w-96 h-96 shadow'>
        {image ?
          <img
            className='object-cover w-full h-full'
            src={image} alt='albumn'
          /> :
          <div className='h-full flex justify-center items-center bg-gray-400'>
            <FontAwesomeIcon className='text-white' icon={faFileImage} size='6x' />
          </div>}
      </div>
      <div className='px-4 py-2 flex w-full bg-white'>
        <div className='flex items-center flex-1'>
          <div>
            <img
              className='w-14 h-14 border border-gray-300 rounded-full overflow-hidden shadow object-fit'
              src={profileImageUrl}
              alt='profile'
            />
          </div>
          <div className='ml-2'>
            <div className='text-sm text-gray-600 leading-tight'>
              {artist}
            </div>
            <div className='text-lg text-gray-900 leading-tight'>
              {title}
            </div>
          </div>
        </div>
        <div className='flex-none flex justify-center items-center'>
          <div
            className='flex justify-center items-center rounded-full w-10 h-10 border-2 border-gray-700'
          >
            <FontAwesomeIcon className='text-gray-700' icon={faPlay} />
          </div>
        </div>
      </div>
    </div>
  )
}
