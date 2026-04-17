import React from 'react'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserProfile from './pages/User'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup/>} />
        <Route path='/' element={<Login/>} />
        <Route path='/home' element={<UserProfile/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
