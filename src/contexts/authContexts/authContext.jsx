import React, { useContext, useState, useEffect } from 'react'
import { auth, db } from "/src/firebase/firebase.js" 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";



const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext)
}

export function AuthProvider ({children}) {

	const [currentUser, setCurrentUser] = useState('')
	const [loading, setLoading] = useState(false)

	async function signup (email, password, name) {
		
		try {
			// Create user with email and password
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			const user = userCredential.user;
		
			// Save user data to db in firestore
			await setDoc(doc(db, "users", user.uid), {
			  uid: user.uid,
			  name: name, 
			  email: user.email,
			  createdAt: new Date(),
			});
		
			// Return the user object
			return user; 
		  } catch (error) {
			console.error("Error signing up:", error);
			throw error; // Re-throw the error to be handled by the caller
		  }
		
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
