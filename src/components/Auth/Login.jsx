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
			console.log('logging in')
			setLoading(true)
			console.log('loading is set to true')
			await login(data.email, data.password)
			console.log("login successful")
			navigate("/")
		} catch (error) {
			console.log(error)
			setError("form_error", {
				type: "manual",
				message: error.message || "Failed to log in. Please try again.",
			  });
		} finally {
		setLoading(false)
	}};

  return (
	<div className='login-container'>
		<h1 className='login-header'>Log In</h1>
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="login-field">
				<label htmlFor="login-email">Email</label>
				<input 
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
				{errors.email && <p className="errorMsg">{errors.email.message}</p>}
			</div>
			<div className="login-field">
				<label htmlFor="login-password">Password</label>
				<input 
					type="password" 
					id='login-password'
					name='password'
					{...register('password',
					{
						required: "Password is required.",
						minLength: {
						  value: 6,
						  message: "Password should be at-least 6 characters."
						}})} />
				{errors.password && (
            <p className="errorMsg">{errors.password.message}</p>
          )}
			</div>

			<button disabled= {loading} type='submit' className='login-btn'>Log In</button>

			<div className='login-p-redirect'>Don't have an account? <Link to="/register">Sign Up</Link></div>

		</form>
	</div>
  )
}
