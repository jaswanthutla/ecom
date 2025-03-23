import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { SearchProvider } from './components/Context.jsx';
import Login from './components/Login/Login.jsx';
import SignUp from './components/SignUp/Signup.jsx';
import Home from './components/Home/Home.jsx';
import Products from './components/Products/Products.jsx';
import AddProduct from './components/AddProduct/AddProduct.jsx';
import Header from './components/Header/Header.jsx';
import ViewProduct from './components/ViewProduct/ViewProduct.jsx';

const AppContent = () => {
  const location = useLocation();
  const hideHeader = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <SearchProvider> {/* Now inside BrowserRouter */}
      {!hideHeader && <Header />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/addproduct' element={<AddProduct />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/viewProduct/:id' element={<ViewProduct />} />
        <Route path='/updateProduct/:id' element={<AddProduct />} />
      </Routes>
    </SearchProvider>
  );
};

const App = () => {
  return (
    <BrowserRouter> {/* BrowserRouter wraps everything */}
      <AppContent />
    </BrowserRouter>
  );
};

export default App;