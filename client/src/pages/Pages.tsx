import { useContext } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { AuthContext } from '../context/auth';

import Home from "./Home";
import Artisans from './inventory/Artisans';
import Cases from './inventory/Cases';
import Keycaps from './inventory/Keycaps';
import Springs from './inventory/Springs';
import Stabs from './inventory/Stabs';
import Switches from './inventory/Switches';
import Login from "./Login";
import Signup from "./Signup";
import UserBuilds from "./builds/UserBuilds";
import UserBuild from './builds/UserBuild';

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
          <Route path="springs" element={!user ? <Navigate replace to='/' /> : <Springs />}/>
          <Route path="stabs" element={!user ? <Navigate replace to='/' /> : <Stabs />}/>
          <Route path="artisans" element={!user ? <Navigate replace to='/' /> : <Artisans />}/>
          <Route path="keycaps" element={!user ? <Navigate replace to='/' /> : <Keycaps />}/>
          <Route path="switches" element={!user ? <Navigate replace to='/' /> : <Switches />}/>
          <Route path="builds" element={!user ? <Navigate replace to='/' /> : <UserBuilds />}/>
          <Route path="builds/:id" element={!user ? <Navigate replace to='/' /> : <UserBuild />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Pages;