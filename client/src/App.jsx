import React from 'react'
import Home from './pages/Home'
import Signup from './pages/auth/Signup'
import Login from './pages/auth/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserProfile from './pages/User'
import PatientPage from './pages/patient/PatientPage'
import AdminPage from './pages/admin/AdminPage'
import ProtectedRoute from './components/ProtectedRoute'
import AuthRoute from './components/AuthRoute'
import DoctorPage from './pages/doctor/DoctorPage'

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
        <Route path='/doctor' element={
          <ProtectedRoute role={'doctor'}>
            <DoctorPage/>
          </ProtectedRoute>
        } />
        <Route path='/admin' element={
          <ProtectedRoute role={'admin'}>
            <AdminPage/>
          </ProtectedRoute>
        } />
      </Routes>
      
    </BrowserRouter>
  )
}

export default App
