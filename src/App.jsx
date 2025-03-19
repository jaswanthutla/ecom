import React, { use } from 'react'
import Login from './components/Login/Login.jsx'
import SignUp from './components/SignUp/Signup.jsx'
import Home from './components/Home/Home.jsx'
import Products from './components/Products/Products.jsx'
import AddProduct from './components/AddProduct/AddProduct.jsx'
import Header from './components/Header/Header.jsx'
import ViewProduct from './components/ViewProduct/ViewProduct.jsx'
import { useLocation } from 'react-router-dom'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
const App = () => {
  const location=useLocation();
  const hideHeader = location.pathname === "/login" || location.pathname === "/signup";
  return (
   <>
   
   
     {!hideHeader && <Header />}

      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path="/products" element={<Products/>}/>
        <Route exact path="/addproduct" element={<AddProduct/>}/>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/viewProduct/:id" element={<ViewProduct/>}/>
        <Route exact path='/updateProduct/:id' element={<AddProduct/>}/>
      </Routes>

    
   </>
  )
}

export default App