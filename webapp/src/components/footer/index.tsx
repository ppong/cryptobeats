import { faPause } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export function Footer() {
  return (
    <div className='absolute bottom-0 w-full'>
      <div className='flex justify-center items-center'>
        <div className='my-16 flex items-center'>
          <div className='flex justify-center items-center rounded-full w-16 h-16 border-4 border-gray-50'>
            <FontAwesomeIcon className='text-gray-50' icon={faPause} size='1x' />
          </div>
          <div className='ml-4'>
            <div className='text-gray-300'>
              Jenny Steel
            </div>
            <div className='text-lg text-gray-50'>
              Feeling Colors Jenny Live @ SHland
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}