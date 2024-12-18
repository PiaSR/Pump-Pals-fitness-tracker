import React from 'react'

const BtnFavoriteList = ({onClick}) => {
  return (
	<div className='rounded-full bg-white border-solid border-white px-4 py-2 flex items-center justify-center text-sm font-normal text-dark-grey shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100  hover:text-gray-700' onClick={onClick}> &hearts;   
          <span className='ml-2 hidden xs:inline'>Favorites</span> 
  </div>
  )
}

export default BtnFavoriteList