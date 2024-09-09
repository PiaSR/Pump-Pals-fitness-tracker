import React from 'react'
import { useAuth } from '/src/contexts/authContexts/authContext'

export function Homepage () {

  const {currentUser} = useAuth()
  console.log(currentUser)

  return (
	<div className='background-purple'>
    <h3 className='text-white'>Hello, {currentUser?.displayName}!</h3>
    <p className='text-base text-white mt-8'>Ready to start a new workout?</p>
    <button className='btn-secondary mt-8'>Let's Go</button>
  </div>
  )
}

