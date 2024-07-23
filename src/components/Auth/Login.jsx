import React from 'react'
import { useForm } from "react-hook-form"

export default function Login () {
	console.log('login comp mounted')
	const {
		register,
		handleSubmit,
		formState: { errors },
	  } = useForm();

	const onSubmit = (data) => {
		console.log(data);
	  };

  return (
	<div className='login-container'>
		<h1 className='login-header'>Welcome Back!</h1>
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="login-field">
				<label htmlFor="login-email">Email</label>
				<input 
					type="email" 
					id='login-email'
					name='email'
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
			<button type='submit' className='login-btn'>Log In</button>
		</form>
	</div>
  )
}
