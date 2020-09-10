import { useState, useEffect, createContext, useContext } from 'react'
import firebase from './firebase'

export const UserContext = createContext()

export default function UserContextComp({ children }) {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState(null)

  const [loadingUser, setLoadingUser] = useState(true)

  useEffect(() => {
    const unsubscriber = firebase.auth().onAuthStateChanged(async (user) => {
      try {
        if (user) {
          user.getIdToken().then(token => {
            setUser(token)
          })
          firebase.firestore().collection('users').doc(user.uid).get().then(data => {
            setUsername(data.data().username)
          })
        } else setUser(null)
      } catch (error) {
        // Most probably a connection error. Handle appropriately.
      } finally {
        setLoadingUser(false)
      }
    })

    // Unsubscribe auth listener on unmount
    return () => unsubscriber()
  }, [])

  return (
    <UserContext.Provider value={{
      user,
      loadingUser,
      username
    }}>
      {children}
    </UserContext.Provider> 
  )
}

// Custom hook that shorhands the context!
export const useUser = () => useContext(UserContext)