import React from 'react';
import './App.css';
import Navigation from './Components/HomeComponents/Navigation';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './Components/HomeComponents/Home';
import Profile from './Components/ProfileComponents/Profile';
import { AuthProvider } from './Components/HomeComponents/Auth1'
import Test from './Components/DocumentComponents/Test';
import Certificates from './Components/CertificateComponents/Certificates';

function App() {
  const navi = useNavigate();

  return (
    <div>
      <AuthProvider>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/documents' element={<Test navi={navi} />}></Route>
        <Route path='/certificates' element={<Certificates />}></Route>
      </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
