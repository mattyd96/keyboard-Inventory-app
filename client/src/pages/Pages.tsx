import { useContext } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Layout from '../components/layout/Layout';

import { AuthContext } from '../context/auth';

import Home from "./Home";
import Cases from './inventory/Cases';
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
        <Route path="/inventory">
          <Route path="cases" element={!user ? <Navigate replace to='/' /> : <Cases />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Pages;