import React from 'react'
import { useForm } from "react-hook-form"

const Register = () => {
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
		<h1 className='login-header'>Register</h1>
		<form onSubmit={handleSubmit(onSubmit)}>
		<div className="login-field">
				<label htmlFor="login-first-name">First Name</label>
				<input 
					type="text" 
					id='login-first-name'
					name='first_name'
					{...register('first_name', {
						required: "First name is required",
						pattern: {
							value: /^[\p{Letter}\s\-.']+$/u,
							message: "First Name can only contain letters."
						  }
					})} />
				{errors.email && <p className="errorMsg">{errors.email.message}</p>}
			</div>
			<div className="login-field">
				<label htmlFor="login-first-name">Last Name</label>
				<input 
					type="text" 
					id='login-last-name'
					name='last_name'
					{...register('last_name', {
						required: "Last name is required",
						pattern: {
							value: /^[\p{Letter}\s\-.']+$/u,
							message: "Last Name can only contain letters."
						  }
					})} />
				{errors.email && <p className="errorMsg">{errors.email.message}</p>}
			</div>
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
  
export default Register