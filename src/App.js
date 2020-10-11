import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Telegram from './components/Telegram';
import { selectUser, login, logout } from './features/userSlice';
import Login from './components/login/Login';
import { auth } from './firebase';

const App = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //logged in
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        //logged out
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return <div className="app">{user ? <Telegram /> : <Login />}</div>;
};

export default App;
