import React from 'react'
import ProfilePage from '@/components/profile/ProfilePage'
import Navbar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
export default function page() {
  return (
    <div>
        <Navbar/>
      <ProfilePage/>
    <Footer/>
    </div>
  )
}
