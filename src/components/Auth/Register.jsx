import React, {useState} from 'react'
import { useForm } from "react-hook-form"
import { useAuth } from '../../contexts/authContexts/authContext';
import { Link, useNavigate }	from "react-router-dom"

const Register = () => {
	const {
		register,
		watch,
		handleSubmit,
		setError,
		clearErrors,
		formState: { errors },
	  } = useForm();

	  const validatePwd = watch("password")
	  const { signup } = useAuth()
	  const [loading, setLoading] = useState(false)
	  const navigate=useNavigate();

	async function onSubmit (data) {
		try {
			setLoading(true)
			clearErrors("form-error")
			await signup(data.email, data.password, data.name)
			navigate("/")
		} catch (error) {
			setError("form_error", {
				type: "manual",
				message: error.message || "Failed to create an account. Please try again.",
			  });
		} finally {
		setLoading(false)
	}};

  return (
	<div className='flex items-center justify-center flex-col max-w-md bg-white bg-opacity-15 p-8 rounded-3xl'>
		<h1 className='text-white '>Sign Up</h1>

		{errors.form_error && <p className='text-xs text-red-500 text-center mt-5 max-w-[270px]'>{errors.form_error.message}</p>}
		
		<form onSubmit={handleSubmit(onSubmit)} className="mt-5 flex justify-center flex-col">
			<div className='flex flex-col justify-start'>
			
				<label htmlFor="login-user-name" className='text-white text-sm -mb-1.5 ml-1'>Name</label>
				<input 
					className='py-2.5 px-10 bg-bg-white bg-opacity-30 rounded-3xl my-2.5 pl-5 text-gray-800'
					type="text" 
					id='login-user-name'
					name='name'
					{...register('name', {
						required: "Username is required",
						pattern: {
							value: /^[\p{Letter}\s\-.']+$/u,
							message: "Your name can only contain letters."
						  }
					})} />
				{errors.name && <p className="text-red-500 break-normal w-56 text-xs mb-3">{errors.name.message}</p>}
			</div>
			
			<div className='flex flex-col justify-start'>

				<label htmlFor="login-email" className='text-white text-sm -mb-1.5 ml-1'>Email</label>
				<input className='py-2.5 px-10 bg-bg-white bg-opacity-30 rounded-3xl my-2.5 pl-5'
					type="email" 
					id='login-email'
					name='email'
					{...register('email', {
						required: "Email is required",
						pattern: {
							value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
							message: "Email is not valid."
						  }
					})}
					autocomplete="email" />
				{errors.email && <p className="text-red-500 break-normal w-56 text-xs mb-3">{errors.email.message}</p>}
			</div>
			<div className='flex flex-col justify-start'>

				<label htmlFor="login-password" className='text-white text-sm -mb-1.5 ml-1'>Password</label>
				<input className='py-2.5 px-10 bg-bg-white bg-opacity-30 rounded-3xl my-2.5 pl-5'
					type="password" 
					id='login-password'
					name='password'
					{...register('password',
					{
						required: "Password is required.",
						minLength: {
						  value: 6,
						  message: "Password should be at least 6 characters."
						}})} />
				{errors.password && (
            <p className="text-red-500 break-normal w-56 text-xs mb-3">{errors.password.message}</p>
          )}
			</div>
			<div className='flex flex-col justify-start'>

				<label htmlFor="login-password-confirm" className='text-white text-sm -mb-1.5 ml-1'>Confirm Password</label>
				<input className='py-2.5 px-10 bg-bg-white bg-opacity-30 rounded-3xl my-2.5 pl-5'
					type="password" 
					id='login-password-confirm'
					name='password_confirm'
					{...register('password_confirm',
					{	validate: (value) =>
						value === validatePwd || "The passwords do not match."
						})} />
				{errors.password_confirm && (
            <p className="text-red-500 break-normal w-56 text-xs mb-3">{errors.password_confirm.message}</p>
          )}
			</div>
			

			<button disabled={loading} type='submit' className='btn-secondary mt-5'>Sign Up</button>
			
			<div className='text-xs text-white self-center mt-3'>Already have an account? <Link to="/login" className='underline'>Log In</Link></div>
		</form>
	</div>
  )
}
  
export default Register