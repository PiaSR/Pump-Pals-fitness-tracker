import React from 'react'
import { NavLink } from 'react-router-dom';
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";









const Navbar = () => {
	const activeClassName = 'text-bg-primary'
  return (
	<div className=' flex justify-between items-center text-3xl text-gray-800  px-6 sm:pt-6 w-full max-w-md sm:rounded-b-3xl '>

		<NavLink to='/' className={({isActive} )=> 
			`${isActive? activeClassName : ''} hover:text-purple-500 `}><HomeIcon />
			</NavLink>

		<NavLink to='/library' className={({isActive} )=> 
			`${isActive? activeClassName : ''} hover:text-purple-500`}><ListIcon /></NavLink>
		
		<NavLink to='/workout' className={({isActive} )=> 
			`${isActive? activeClassName : ''} hover:text-purple-500  `}><AddIcon />
			</NavLink>

		<NavLink to='/favorites' className={({isActive} )=> 
			`${isActive? activeClassName : ''} hover:text-purple-500 `}><BookmarkBorderIcon />
			</NavLink>


		<NavLink to='/profile' className={({isActive} )=> `${isActive? activeClassName : ''} hover:text-purple-500`}><PersonIcon /></NavLink>

	</div>
  )
}

export default Navbar