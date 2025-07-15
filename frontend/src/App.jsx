import React, { useContext } from 'react'
import Home from './components/Home'
import SignUp from './components/SignUp'
import Login from './components/Login'
import { Routes, Route, Navigate  } from 'react-router'
import {UseAuth }from "./contest/Authprovider"



const App = () => {
  const {authUser} = UseAuth();

  return (
    <div>
      <Routes>
        <Route path='/' element={ authUser?<Home/>:<Navigate to={"/Login"} />}/>
        <Route path='/login' element={authUser?<Navigate to={"/"}/>:<Login/>}/>
        <Route path='/signup' element={authUser?<Navigate to={"/"}/>:<SignUp/>}/>


      </Routes>
      
    </div>
  )
}

export default App
