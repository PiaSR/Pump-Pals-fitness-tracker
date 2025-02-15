import React from 'react'
import { FaThList } from "react-icons/fa";
import { GiProgression } from "react-icons/gi";
import { MdAccountCircle } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import { MdHome } from "react-icons/md";




const Navbar = () => {
	const activeClassName = 'text-bg-primary'
  return (
	<div className='flex justify-between items-center text-2xl text-gray-800 h-full bg-bg-white bg-opacity-30 px-16 sm:px-24 pt-8 pb-3 w-full sm:rounded-b-3xl '>
		<NavLink to='/' className={({isActive} )=> 
			`${isActive? activeClassName : ''} hover:text-purple-500`}><MdHome />
			</NavLink>

		<NavLink to='library' className={({isActive} )=> 
			`${isActive? activeClassName : ''} hover:text-purple-500`}><FaThList to='/'/></NavLink>
		
		
		<NavLink to='progress' className={({isActive} )=>`${isActive? activeClassName : ''} hover:text-purple-500`}><GiProgression /></NavLink>
		<NavLink to='profile' className={({isActive} )=> `${isActive? activeClassName : ''} hover:text-purple-500`}><MdAccountCircle /></NavLink>

	</div>
  )
}

export default Navbar