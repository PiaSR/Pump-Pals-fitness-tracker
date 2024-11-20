import React, {useState} from 'react'
import { useForm } from "react-hook-form"
import { useAuth } from '../../contexts/authContexts/authContext';
import { Link, useNavigate } from "react-router-dom"


export default function Login () {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	  } = useForm();

	  
	  const [loading, setLoading] = useState(false)
	  const { login } =useAuth();
	  const navigate=useNavigate();

	async function onSubmit (data) {
		try {
			setLoading(true)
			await login(data.email, data.password)
			console.log("login successful")
			navigate("/")
		} catch (error) {
			console.log("there was an error logging in:", error)
			setError("form_error", {
				type: "manual",
				message: error.message || "Failed to log in. Please try again.",
			  });
			  alert("Logging in was unsuccessful. Email or password are incorrect. Please try again.")
		} finally {
		setLoading(false)
	}};

  return (
	<div className='background-purple'>
		<h1 className='text-white'>Log In</h1>
		
		 
		
		<form onSubmit={handleSubmit(onSubmit)} className="mt-20 flex justify-center flex-col" >
			<div className='flex flex-col justify-start'>
				<label htmlFor="login-email"  className='text-white text-sm -mb-1.5 ml-1'>Email</label>
				<input 
					className='py-3.5 px-10 bg-bg-white rounded-3xl my-2.5 padding pl-5 w-64'
					type="email" 
					
					id='login-email'
					name='email'
					autocomplete="email"
					{...register('email', {
						required: "Email is required",
						pattern: {
							value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
							message: "Email is not valid."
						  }
					
					})} />
				{errors.email && <p className="text-white break-normal w-56 text-xs">{errors.email.message}</p>}
			</div>
			<div className='flex flex-col justify-start'>
				<label htmlFor="login-password" className='text-white text-sm -mb-1.5 ml-1' >Password</label>
				<input 
					className='py-3.5 px-10 bg-bg-white rounded-3xl my-2.5 pl-5 w-64 invalid:border-pink-500'
					type="password" 
					id='login-password'
					name='password'
					formnovalidate="formnovalidate"
					{...register('password',
					{
						required: "Password is required.",
						minLength: {
						  value: 6,
						  message: "Password should be at-least 6 characters."
						}})} />
				{errors.password && (
            <p className='text-white break-normal w-56 text-xs'>{errors.password.message}</p>
          )}
			</div>

			<button disabled= {loading} type='submit' className='btn-secondary mt-5'>Log In</button>

			<div className='text-xs text-white self-center mt-3'>Don't have an account? <Link to="/register" className='underline'>Sign Up</Link></div>

		</form>
	</div>
  )
}
