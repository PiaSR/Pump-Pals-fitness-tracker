import React, {useState} from 'react'
import { useForm } from "react-hook-form"
import { useAuth } from '../../contexts/authContexts/authContext';

const Register = () => {
	const {
		register,
		watch,
		handleSubmit,
		setError,
		formState: { errors },
	  } = useForm();

	  const validatePwd = watch("password")
	  const { signup } = useAuth()
	  const [loading, setLoading] = useState(false)

	async function onSubmit (data) {
		try {
			setLoading(true)
			await signup(data.email, data.password)
		} catch (error) {
			setError("form_error", {
				type: "manual",
				message: error.message || "Failed to create an account. Please try again.",
			  });
		} finally {
		setLoading(false)
	}};

  return (
	<div className='login-container'>
		<h1 className='login-header'>Register</h1>
		
		<form onSubmit={handleSubmit(onSubmit)}>
		<div className="login-field">
			
				<label htmlFor="login-user-name">Name</label>
				<input 
					type="text" 
					id='login-user-name'
					name='user'
					{...register('user', {
						required: "Username is required",
						pattern: {
							value: /^[\p{Letter}\s\-.']+$/u,
							message: "Your name can only contain letters."
						  }
					})} />
				{errors.user_name && <p className="errorMsg">{errors.user_name.message}</p>}
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
					})}
					autocomplete="email" />
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
						  message: "Password should be at least 6 characters."
						}})} />
				{errors.password && (
            <p className="errorMsg">{errors.password.message}</p>
          )}
			</div>
			<div className="login-field">
				<label htmlFor="login-password-confirm">Confirm Password</label>
				<input 
					type="password" 
					id='login-password-confirm'
					name='password_confirm'
					{...register('password_confirm',
					{	validate: (value) =>
						value === validatePwd || "The passwords do not match."
						})} />
				{errors.password_confirm && (
            <p className="errorMsg">{errors.password_confirm.message}</p>
          )}
			</div>
			<button disabled={loading} type='submit' className='login-btn'>Log In</button>
			
		</form>
	</div>
  )
}
  
export default Register