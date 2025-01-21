import React from 'react'
import { FaThList } from "react-icons/fa";
import { GiProgression } from "react-icons/gi";
import { MdAccountCircle } from "react-icons/md";



const Navbar = () => {
  return (
	<div className='flex justify-between text-3xl text-gray-800 bg-bg-white bg-opacity-40 px-12 sm:px-24 py-8 w-full sm:rounded-b-3xl'>
		<FaThList />
		<GiProgression />
		<MdAccountCircle />

	</div>
  )
}

export default Navbar