//import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Routes, Route } from "react-router-dom";
import './App.css'
import './src/styles/main.less'
import './src/styles/header.less'
import './src/styles/home.less'
import './src/styles/services.less'
import { AuthProvider } from "./src/auth/AuthContext";
import PublicLayout from "./src/layouts/PublicLayout";
import PrivateLayout from "./src/layouts/PrivateLayout";
import ProtectedRoute from "./src/auth/ProtectedRoute";

import Login from "./src/pages/Login/Login";
import Products from "./src/pages/Products";
import AboutUs from "./src/pages/AboutUs";
import ContactUs from "./src/pages/ContactUs";
import Services from "./src/pages/Services";
import Home from "./src/pages/Home";

function App() {
  //const [count, setCount] = useState(0)

  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Private routes */}
        <Route
          element={
            <ProtectedRoute>
              <PrivateLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Route>
      </Routes>
    {/* <Header></Header>
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
    </main> */}
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="container app-container">
        <h1>React + LESS + Bootstrap</h1>

        <button className="btn btn-primary">
          Bootstrap Button
        </button>
      </div> */}
    </AuthProvider>
  )
}

export default App
