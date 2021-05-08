// Firebase App (the core Firebase SDK) is always required and must be listed first
// import { initializeApp } from 'firebase/app';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import { firebase, firebaseui } from './firebase'
import './App.scss';
import { useEffect, useState } from 'react';

import Timer from './Timer'
const signIn = () => {
    const ui = new firebaseui.auth.AuthUI(firebase.auth())
    console.log(ui)
    ui.start('#firebaseui-auth-container', {
      signInOptions: [
        // List of OAuth providers supported.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccess: () => {
          return false
        }
      }
      // Other config options...
    });

}
function App() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      setUser(user)
      if (!user) {
        signIn()
      }
    });
  }, [])

  const logout = async () => {
    try {
      await firebase.auth().signOut();
      // signed out
    } catch (e){
     // an error
    }
  }
  return (
    <div className="App">
      {
        user ?
        <div>
          <Timer user={user} />
          <button onClick={logout}>log out</button>
        </div>
        : <div id="firebaseui-auth-container"></div>
      }
    </div>
  );
}

export default App;
