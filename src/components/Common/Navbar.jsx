import React from 'react'
import { FaThList } from "react-icons/fa";
import { GiProgression } from "react-icons/gi";
import { MdAccountCircle } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import { MdHome } from "react-icons/md";
import { FaPlusSquare } from "react-icons/fa";





const Navbar = () => {
	const activeClassName = 'text-bg-primary'
  return (
	<div className=' flex justify-between items-center text-2xl text-gray-800 h-[20px]px-6 sm:px-24 pt-3 sm:pt-6 sm:pb-3 w-full sm:rounded-b-3xl '>

		<NavLink to='/' className={({isActive} )=> 
			`${isActive? activeClassName : ''} hover:text-purple-500 text-3xl`}><MdHome />
			</NavLink>

		<NavLink to='library' className={({isActive} )=> 
			`${isActive? activeClassName : ''} hover:text-purple-500`}><FaThList /></NavLink>
		
		<NavLink to='workout' className={({isActive} )=> 
			`${isActive? activeClassName : ''} hover:text-purple-500 text-4xl `}><FaPlusSquare />
			</NavLink>

		
		<NavLink to='progress' className={({isActive} )=>`${isActive? activeClassName : ''} hover:text-purple-500`}><GiProgression /></NavLink>

		<NavLink to='profile' className={({isActive} )=> `${isActive? activeClassName : ''} hover:text-purple-500 text-3xl`}><MdAccountCircle /></NavLink>

	</div>
  )
}

export default Navbar