import { useContext } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { AuthContext } from '../context/auth';

import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";

function Pages() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Navigate replace to='/' /> : <Login />} />
        <Route path="/signup" element={user ? <Navigate replace to='/' /> : <Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Pages;