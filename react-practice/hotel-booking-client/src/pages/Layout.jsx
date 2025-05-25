
import { Outlet } from 'react-router-dom'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import { ToastContainer } from 'react-toastify'

const Layout = () => {
  return (
    <>
        <ToastContainer/>
        <Header />
        <Outlet />
        <Footer />
    </>
  )
}

export default Layout