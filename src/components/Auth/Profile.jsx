import React, {useState} from 'react'
import { useAuth } from '../../contexts/authContexts/authContext';
import { signOut } from 'firebase/auth';

export default function Profile () {

 const [error, setError] = useState("")
 const {currentUser} = useAuth()


function handleLogout() {
	signOut()
}
  return (
	<div>
		<h1>Profile</h1>
		{error && <p className="text-white break-normal w-56 text-xs">{error}</p>}

		<strong>Email:</strong> {currentUser.email}

		<button  type='submit' className='btn-secondary mt-5' onClick={handleLogout}>Log Out</button></div>
	
  )
}
