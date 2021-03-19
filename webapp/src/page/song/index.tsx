import React, { useRef } from "react";

const backgroundImage = 'https://images.unsplash.com/photo-1525577288853-c6f0a020a162'

export function SongPage() {
  const waveformWrapperDiv = useRef<HTMLDivElement>(null)
  return (
    <div className='w-screen h-screen bg-gray-100'>
      <div className='absolute inset-0 bg-center bg-no-repeat bg-cover'
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
      </div>
      <div className='w-full h-full flex flex-col justify-center items-center'
        style={{
          backdropFilter: 'blur(8px)',
        }}
      >
        <div className='flex items-center w-full max-w-3xl'>
          <div className='flex-none w-48 h-48 shadow'>
            <img
              className='object-cover w-full h-full'
              src={backgroundImage} alt='albumn'
            />
          </div>
          <div className='ml-6'>
            <div
              className='shadow'
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                width: 'fit-content',
              }}
            >
              <div className='px-2 py-1 text-sm text-gray-400'>
                Jeremy Steel
              </div>
            </div>
            <div
              className='mt-1 shadow'
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                width: 'fit-content',
              }}
            >
              <div className='px-2 py-1 text-2xl text-gray-300'>
                Feeling Colors live @ Sandhill
              </div>
            </div>
            <div className='mt-4 px-2 text-gray-300'>
              In a dream collaboration with electronic mastermind Fiftyfivethousand and Jenny Steel rocks the show at...
              </div>
            <div className='mt-4 flex space-x-2'>
              <div
                className='px-2 py-1 rounded-full shadow'
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  width: 'fit-content',
                }}
              >
                <div className='text-sm text-gray-300'>
                  #Electric
                </div>
              </div>
              <div
                className='px-2 py-1 rounded-full shadow'
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  width: 'fit-content',
                }}
              >
                <div className='text-sm text-gray-300'>
                  #Jenny Steel
                  </div>
              </div>
              <div
                className='px-2 py-1 rounded-full'
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  width: 'fit-content',
                }}
              >
                <div className='text-sm text-gray-300'>
                  #California
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className='mt-8 w-full max-w-3xl'
          ref={waveformWrapperDiv}
        >
        </div>
        <div>

        </div>
      </div>
    </div>
  );
}

