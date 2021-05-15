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
import TOC from './TOC'
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

  const [obsHelpVisible, setObsHelpVisible] = useState(false)
  const toggleOBSHelp = () => setObsHelpVisible(c => !c)
  return (
    <div className="App text-center p-1">
      <div className='flex justify-evenly items-center'>
        <img src={pinclashLogo} alt='Pinclash' className='h-32' />
        <img src={eventLogo} className='h-20' alt='Avengers' />
      </div>
      <Router>
        <Switch>
          <Route path='/toc'>
            <TOC />

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


                  <button onClick={toggleOBSHelp}>Trouble Logging in with OBS?</button>
                  <div className={classNames('max-w-lg mx-auto my-2', { hidden: !obsHelpVisible })}>
                    You'll likely need to configure the "user-agent" parameter that the OBS Browser Source uses to interact with the web. Some details <a className='underline' href="https://obsproject.com/forum/threads/problem-with-logging-into-my-google-account-through-the-dock-panel.114376/#lg=post-498684&slide=0">here</a>
                    {' '}
                    <a className='underline' href="https://obsproject.com/forum/threads/browser-source-this-browser-or-app-may-not-be-supported-fail-to-log-into-my-google-account.128863/">and here</a>{' '}
                    {' '}<a className='underline' href="
                    https://obsproject.com/forum/threads/problem-with-logging-into-my-google-account-through-the-dock-panel.114376/">also here</a>

                    <br /><br />

                    Once added as a browser source, right click the source and select "Interact" to ...
                  </div>
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
