import React, {useState} from 'react'
import { useForm } from "react-hook-form"
import { useAuth } from '../../contexts/authContexts/authContext';
import { Link, useNavigate } from "react-router-dom"


export default function Login () {
	const {
		register,
		handleSubmit,
		setError,
		clearErrors,
		formState: { errors },
	  } = useForm();

	  
	  const [loading, setLoading] = useState(false)
	  const { login } =useAuth();
	  const navigate=useNavigate();

	async function onSubmit (data) {
		try {
			setLoading(true)
			clearErrors("form-error")
			await login(data.email, data.password)
			alert("login was successful!")
			console.log("login successful")
			navigate("/")
		} catch (error) {
			console.log("there was an error logging in:", error)
			setError("form_error", {
				type: "manual",
				message: error.message || "Failed to log in. Please try again.",
			  });
			  setError("form_error", {
				type: 'manual',
				message: "Logging in was unsuccessful. Email or password are incorrect. Please try again."})
		} finally {
		setLoading(false)
	}};

  return (
	<div className='flex items-center justify-center flex-col  max-w-md bg-white bg-opacity-15 px-8 py-10 rounded-3xl'>
		<h1 className='text-white '>Log In</h1>
		
		 
		{errors.form_error && <p className='text-xs text-red-500 text-center mt-5 max-w-[270px]'>{errors.form_error.message}</p>}
		<form onSubmit={handleSubmit(onSubmit)} className="mt-5 flex justify-center flex-col" >
			<div className='flex flex-col justify-start'>
				<label htmlFor="login-email"  className='text-white text-sm -mb-1.5 ml-1'>Email</label>
				<input 
					className='py-2.5 px-10 bg-bg-white bg-opacity-30 rounded-3xl my-2.5 padding pl-5 w-64'
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
					
					})}
					onChange={()=>clearErrors(["email", "form_error"])} />
				{errors.email && <p className="text-red-500 break-normal w-56 text-xs mb-3">{errors.email.message}</p>}
			</div>
			<div className='flex flex-col justify-start'>
				<label htmlFor="login-password" className='text-white text-sm -mb-1.5 ml-1 bg-opacity-30' >Password</label>
				<input 
					className='py-2.5 px-10  bg-bg-white bg-opacity-30  rounded-3xl my-2.5 pl-5 w-64 invalid:border-pink-500 '
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
						}})}
						onChange={()=>clearErrors(["password", "form_error"])} 
						/>
				{errors.password && (
            <p className="text-red-500 break-normal w-56 text-xs mb-3">{errors.password.message}</p>
          )}
			</div>

			<button disabled= {loading} type='submit' className='btn-secondary mt-5'>Log In</button>

			<div className='text-xs text-white self-center mt-3'>Don't have an account? <Link to="/register" className='underline'>Sign Up</Link></div>

		</form>
	</div>
  )
}
