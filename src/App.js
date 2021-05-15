// Firebase App (the core Firebase SDK) is always required and must be listed first
// import { initializeApp } from 'firebase/app';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import { firebase } from './firebase'
import './App.scss';
import { useEffect, useState } from 'react';

import PinclashTimer from './PinclashTimer'
import pinclashLogo from './media/PinClashLarge.png'
import eventLogo from './media/AIQ_logo.png'
import classNames from 'classnames';
import { XIcon } from '@heroicons/react/solid'

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  const [user, setUser] = useState(null)
  const [tocChecked, setTocChecked] = useState(false)

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setUser(user)
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  const logout = async () => {
    try {
      await firebase.auth().signOut();
      // signed out
    } catch (e){
     // an error
    }
  }

  const uiConfig = {
    signInOptions: [
      // List of OAuth providers supported.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => {
        return false
      }
    }
  }
  return (
    <div className="App text-center p-1">
      <div className='flex justify-evenly items-center'>
        <img src={pinclashLogo} alt='Pinclash' className='h-32' />
        <img src={eventLogo} className='h-20' alt='Avengers' />
      </div>
      <Router>
        <Switch>
          <Route path='/toc'>
            <div>
            <Link to='/'><XIcon className="absolute top-10 right-10 cursor-pointer h-10 w-10 text-black-500 hover:text-blue-500" /></Link>
              <p className='my-2'>Terms and Conditions</p>
              <p className='max-w-2xl mx-auto my-2'>
                The Pinclash Timer and all subsequent features (the product) is provided without warranty and with no guarentees of reliability. Data may be wiped at any time.
              </p>
              <p className='max-w-2xl mx-auto my-2'>
                The product is provided free of charge to users who are not in the IFPA Top 100 as of May 1st 2021. Users ranked in the IFPA Top 100 must venmo @Nick-Yahnke $50 before they are authorized to use this product. By using this product, you agree that you are either not in the IFPA Top 100 or you have sent $50 to @Nick-Yahnke. Failure to abide by these Terms may result in a revocation of services at any time.
              </p>
              <Link to='/'><button className='cursor-pointer'>Back</button></Link>
            </div>

          </Route>
          <Route path="/">
            {
              user ?
              <div>
                <PinclashTimer user={user} logout={logout} />
              </div>
              :
              <div>
                <input type='checkbox' checked={tocChecked} onChange={e => setTocChecked(c => !c)} /> I agree to the <Link className='underline' to="/toc">Terms And Conditions</Link>
                <div className={classNames({ hidden: !tocChecked })}>
                  <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                </div>
              </div>
            }
          </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
