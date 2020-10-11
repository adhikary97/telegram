import React from 'react';
import { auth, provider } from '../../firebase';
import { Button } from '@material-ui/core';
import './Login.css';

const Login = () => {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__telegram">
        <img
          src={`${process.env.PUBLIC_URL}telegramlogo.png`}
          alt="telegram logo"
        />
        <h1>Telegram</h1>
      </div>
      <Button onClick={signIn}>Sign in</Button>
    </div>
  );
};

export default Login;
