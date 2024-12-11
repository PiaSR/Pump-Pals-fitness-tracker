import React from 'react'

const BtnFavorite = () => {
  return (
	<div className='rounded-full bg-white border-solid border-white px-3 flex items-center justify-center text-sm font-normal text-dark-grey shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100  hover:text-gray-700' > &hearts;   
          <span className='ml-2 hidden xs:inline'>Favourites</span> 
  </div>
  )
}

export default BtnFavorite