import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const profilePictureImage = 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29'
const collectibleImage = 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29'

export function CreationPage() {
  return (
    <div
      className='absolute w-screen h-screen flex bg-white z-10'
    >
      <div className='flex-1 flex justify-center items-center bg-black'>
        <CollectibleCard
          image={collectibleImage}
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
            <label className="block text-sm font-medium text-gray-700">First name</label>
            <input type="text"
              className="mt-1 px-3 py-2 w-full rounded-md border border-gray-300" />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">First name</label>
            <input type="text"
              className="mt-1 px-3 py-2 w-full rounded-md border border-gray-300" />
          </div>

          <div className="mt-4 max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border rounded-md">
            <div className="space-y-1 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-gray-900 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                  <span>Upload Albumn Cover</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" />
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
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">
                MP3 up to 10MB
              </p>
            </div>
          </div>

          <button className='mt-8 px-3 py-3 w-full rounded-full bg-black text-white shadow'>
            Create
          </button>
        </div>
      </div>
    </div >
  )
}

interface ICollectionCardProps {
  image: string
}
function CollectibleCard(props: ICollectionCardProps) {
  const { image } = props
  return (
    <div className='w-96'>
      <div className='flex-none w-96 h-96 shadow'>
        <img
          className='object-cover w-full h-full'
          src={image} alt='albumn'
        />
      </div>
      <div className='px-4 py-2 flex w-full bg-white'>
        <div className='flex items-center flex-1'>
          <div>
            <img
              className='w-14 h-14 border border-gray-300 rounded-full overflow-hidden shadow object-fit'
              src={profilePictureImage}
              alt='profile'
            />
          </div>
          <div className='ml-2'>
            <div className='text-sm text-gray-600 leading-tight'>
              Mike Shinoda
            </div>
            <div className='text-lg text-gray-900 leading-tight'>
              Remember the name
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