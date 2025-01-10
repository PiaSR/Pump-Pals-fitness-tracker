import React, { createContext, useContext, useState, useEffect } from 'react'
import { auth, db } from "/src/firebase/firebase.js" 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";


const INITIAL_STATE = {
	currentUser: JSON.parse(localStorage.getItem('user')) || null
}

const AuthContext = createContext(INITIAL_STATE);

export function useAuth() {
	return useContext(AuthContext)
}

 export function AuthProvider ({children}) {

	const [currentUser, setCurrentUser] = useState(INITIAL_STATE) 
	const [loading, setLoading] = useState(false)


//Register a new user
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

			//save display name, because this doesn't get saved automatically
			await updateProfile(user, {
				displayName: name	
			  });
			  console.log("Profile updated successfully");
			// Return the user object
			return user; 
		  } catch (error) {
			console.error("Error signing up:", error);
			throw error; 
		  }
		
	}

//Log in an existing user
	async function login (email, password) {
			const userCredential= await signInWithEmailAndPassword(auth, email, password)
			return userCredential.user;
	}

	useEffect(() => {
		setLoading(true)
		const unsubscribe = auth.onAuthStateChanged(user => {
			console.log('Auth state changed:', user); // Debug log
			setCurrentUser(user);

			// Save to localStorage
			if (user) {
				localStorage.setItem("user", JSON.stringify({
					uid: user.uid,
					email: user.email,
					displayName: user.displayName
				}));
			} else {
				localStorage.removeItem("user");
			}
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
