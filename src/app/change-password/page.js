import React from 'react'
// import EditProfilePage from '@/components/profile/editProfile'
import ChangePasswordPage from '@/components/profile/ChangePasswordPage'
import Navbar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
export default function page() {
  return (
    <div>
        <Navbar/>
      <ChangePasswordPage/>
      <Footer/>
    </div>
  )
}
