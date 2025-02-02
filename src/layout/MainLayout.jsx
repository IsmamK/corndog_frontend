import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"


const MainLayout = ({cartDetails}) => {
console.log('MainLayout cartDetails:', cartDetails);
  return (
    <>
         <Navbar cartDetails={cartDetails}/>
        <Outlet />
        <ToastContainer />
        <Footer />
      
    </>
  )
}

export default MainLayout
