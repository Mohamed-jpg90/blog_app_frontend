import React from 'react'
import AddBlogForm from '@/components/home/AddBlogForm'
import Navbar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
export default function page() {
  return (
    <div>
        <Navbar/>
      <AddBlogForm/>
      <Footer/>
    </div>
  )
}
