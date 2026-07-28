import React from 'react'
import Navbar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import EditProfilePage from '@/components/profile/EditProfile'
export default function page() {
  return (
    <div>
        <Navbar/>

<EditProfilePage/>
        <Footer/>
      
    </div>
  )
}
