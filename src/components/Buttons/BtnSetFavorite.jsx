import React from 'react'

const BtnSetFavorite = ({onClick}) => {
  return (
	<div className=' rounded-full bg-transparent border-transparent px-4 py-2 flex items-center justify-center text-xl font-normal text-dark-grey hover:bg-gray-100  hover:text-gray-700 ' onClick={onClick} > &hearts;   
         
  </div>
  )
}

export default BtnSetFavorite