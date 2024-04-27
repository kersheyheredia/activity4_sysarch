import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';


import Signup from './SignUp'
import Login from './LogIn'
import Prod from './Products'
import Disp from './Display'
function App() {
  return (
    <>
      <Router>
        <Routes>
        
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/products" element={<Prod/>} />
        <Route path="/display" element={<Disp/>} />


        <Route path="*" element={<Navigate to="/signup" />} />
        {/* Other routes */}
        </Routes>
      </Router>
    </>
  )
}

export default App
