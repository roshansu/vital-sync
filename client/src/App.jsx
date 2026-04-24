import React from 'react'
import Home from './pages/Home'
import Signup from './pages/auth/Signup'
import Login from './pages/auth/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserProfile from './pages/User'
import PatientPage from './pages/patient/PatientPage'
import ProtectedRoute from './components/ProtectedRoute'
import AuthRoute from './components/AuthRoute'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signup' element={
          <AuthRoute >
            <Signup/>
          </AuthRoute>
        } />
        <Route path='/login' element={
          <AuthRoute>
            <Login/>
          </AuthRoute>
        } />
        <Route path='/home' element={<UserProfile/>} />
        <Route path='/patient' element={
          <ProtectedRoute role={'patient'}>
            <PatientPage/>
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
