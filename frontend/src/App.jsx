import React from 'react'
import Home from './components/Home'
import SignUp from './components/SignUp'
import Login from './components/Login'
import { Routes, Route  } from 'react-router'



const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>


      </Routes>
      
    </div>
  )
}

export default App
