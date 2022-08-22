import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import toast , { Toaster } from "react-hot-toast";
type Props = {}

const Layout = (props: Props) => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
            <Toaster />
        </>
    )
}

export default Layout