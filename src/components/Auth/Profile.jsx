import React, {useState} from 'react'
import { useAuth } from '../../contexts/authContexts/authContext';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Profile () {

 const [error, setError] = useState("")
 const {currentUser, auth} = useAuth()
 const navigate = useNavigate()


 async function handleLogout() {
    try {
      await signOut(auth); 
      navigate('/login');
    } catch (err) {
      setError('Failed to log out');
      console.error(err);
    }
  }
  return (
	<div className='flex flex-col justify-between items-center  p-10 w-full  h-full sm:w-[80dvw] md:w-[70dvw] lg:max-w-4xl sm:h-[90dvh] sm:rounded-3xl sm:m-3 '>
	
	<h3 className=' text-2xl self-start m-10 text-gray-800'>My Profile</h3>
		{error && <p className="text-white break-normal w-56 text-xs">{error}</p>}

		<div className='flex flex-col bg-green-400 w-full h-full '>
			<div className='flex flex-col p-5'>
				<div className='mr-3 text-sm text-gray-500'>Email</div> 
				<div className='text-gray-600'>{currentUser.email}</div>
				<hr className='border-solid border-gray-200 w-full mt-4'/>
			</div>
		</div>
		<button  type='submit' className='btn-secondary mt-5 w-full' onClick={handleLogout}>Log Out</button>
	</div>
  )
}
