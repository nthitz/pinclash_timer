// Firebase App (the core Firebase SDK) is always required and must be listed first
// import { initializeApp } from 'firebase/app';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import { firebase, firebaseui } from './firebase'
import './App.scss';
import { useEffect, useState } from 'react';

import PinclashTimer from './PinclashTimer'
import pinclashLogo from './media/PinClashLarge.png'
import eventLogo from './media/AIQ_logo.png'

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
    <div className="App text-center p-1">
      <div className='flex justify-evenly items-center'>
        <img src={pinclashLogo} alt='Pinclash' className='h-32' />
        <img src={eventLogo} className='h-20' alt='Avengers' />
      </div>
      {
        user ?
        <div>
          <PinclashTimer user={user} logout={logout} />
        </div>
        : <div id="firebaseui-auth-container"></div>
      }
    </div>
  );
}

export default App;
