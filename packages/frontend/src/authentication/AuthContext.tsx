import { createContext, useContext, useEffect, useState } from 'react'
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from 'firebase/auth'
import { auth } from './firebase'

const AuthContext = createContext<any>({})

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [currentUser, setCurrentUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                })
            } else {
                setCurrentUser(null)
            }
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    async function signup(email: string, password: string, name: string) {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            )
            const user = userCredential.user

            if (user) {
                // Update profile
                await updateProfile(user, {
                    displayName: name,
                })

                setCurrentUser({
                    ...user,
                })

                console.log('Signup successful:', user)
            } else {
                console.error('Signup error: User is null')
            }
        } catch (error) {
            console.error('Signup error:', error)
        }
    }

    const login = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = async () => {
        setCurrentUser(null)
        await signOut(auth)
    }

    return (
        <AuthContext.Provider value={{ currentUser, login, signup, logout }}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}
