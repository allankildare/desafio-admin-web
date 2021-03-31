import React from "react";
import { Redirect } from "react-router-dom";
import "./App.css";
import { UserContext, LoginUser, AuthApp } from './context'

function App() {
  const { user } = React.useContext(UserContext);

  return user.auth ? <Redirect to="/dashboard" /> : <LoginUser />;
}

export default App;
