import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { defaultBackground, useAppContext } from "../../components/context/application";
import { Waveform } from "../../components/waveform";
import { mockData } from "../collection";

// const backgroundImage = 'https://images.unsplash.com/photo-1525577288853-c6f0a020a162'
// const backgroundImage = 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29'

export function SongPage() {
  const { track: selectedTrack, isPlaying, togglePlayback, setBackgroundImage } = useAppContext()
  const track = selectedTrack || mockData[0]
  useEffect(() => {
    if (track?.albumCoverUrl) {
      setBackgroundImage(track?.albumCoverUrl)
    }
    return () => setBackgroundImage(defaultBackground)
  }, [track])

  const [audioWaveform, setAudioWaveform] = useState<AudioBuffer | undefined>()
  const waveformWrapperDiv = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!track) { return }
    var request = new XMLHttpRequest();
    request.open('GET', track!.mediaUrl, true);
    request.responseType = 'arraybuffer';
    request.addEventListener('load', function () {
      var context = new window.AudioContext()
      context.decodeAudioData(request.response, (buffer) => {
        setAudioWaveform(buffer)
      })
    })
    request.send()
  }, [track])

  const waveformWrapperDivWidth = waveformWrapperDiv?.current?.getBoundingClientRect().width || 0
  return (
    <div className='w-screen h-screen bg-gray-100'>
      <div className='absolute inset-0 bg-center bg-no-repeat bg-cover'
        style={{
          backgroundImage: `url(${track?.albumCoverUrl})`,
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
              src={track?.albumCoverUrl} alt='albumn'
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
                {track?.artist}
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
                {track?.title}
              </div>
            </div>
            <div className='mt-4 px-2 text-gray-300'>
              {track?.description}
            </div>
            <div className='mt-4 flex space-x-2'>
              <div
                className='px-2 py-1 rounded-full shadow'
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  width: 'fit-content',
                }}
              >
                <div className='text-sm text-gray-300'>
                  #Crypto
                </div>
              </div>
              <div
                className='px-2 py-1 rounded-full shadow'
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  width: 'fit-content',
                }}
              >
                <div className='text-sm text-gray-300'>
                  #{track?.artist}
                </div>
              </div>
              <div
                className='px-2 py-1 rounded-full'
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  width: 'fit-content',
                }}
              >
                <div className='text-sm text-gray-300'>
                  #Zora
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className='mt-8 w-full max-w-3xl'
          ref={waveformWrapperDiv}
        >
          {audioWaveform && waveformWrapperDivWidth > 0 &&
            <Waveform waveform={audioWaveform} width={waveformWrapperDivWidth} />}
        </div>
        <div className='mt-8 flex justify-center'>
          <div onClick={togglePlayback} className='flex justify-center items-center rounded-full w-16 h-16 border-2 border-gray-50'>
            <FontAwesomeIcon className='text-gray-50' icon={isPlaying ? faPause : faPlay} size='1x' />
          </div>
        </div>
      </div>
    </div>
  );
}

