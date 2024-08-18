import React, { useContext, useState, useEffect } from 'react'
import { auth } from "/src/firebase/firebase.js" 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";



const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext)
}

export function AuthProvider ({children}) {

	const [currentUser, setCurrentUser] = useState('')
	const [loading, setLoading] = useState(false)

	async function signup (email, password) {
		const userCredential= await createUserWithEmailAndPassword(auth, email, password)
		return userCredential.user;
	}

	async function login (email, password) {
	const userCredential= await signInWithEmailAndPassword(auth, email, password)
	return userCredential.user;
	}

	useEffect(() => {
		setLoading(true)
		const unsubscribe = auth.onAuthStateChanged(user => {
			
			setCurrentUser(user)
			setLoading(false)
	})
	return unsubscribe
	}, [])

	const value = {
		currentUser,
		signup, 
		login
	}

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	)

}
