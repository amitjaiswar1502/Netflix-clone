import React, { useEffect } from 'react';
import HomeScreen from './components/screens/HomeScreen';
import LoginScreen from './components/screens/LoginScreen';
import {
  BrowserRouter,
  Route,
  Routes,
  // Link,
} from "react-router-dom";
import './App.css';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import ProfileScreen from './components/screens/ProfileScreen';


function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        // logged in
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email,
        }))
        // console.log(userAuth)
      } else {
        // logged out
        dispatch(logout());
      }
    });
    return unsubscribe;

  }, [dispatch])



  return (
    <div className="app">
      <BrowserRouter>
        {!user ? (< LoginScreen />)
          :
          <Routes>
            ( <Route exact path="/" element={<HomeScreen />} />
            <Route exact path="/profile" element={<ProfileScreen />} />
            )
          </Routes>}
      </BrowserRouter>

    </div>
  );
}

export default App;
