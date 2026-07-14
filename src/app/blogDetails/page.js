import React from 'react'
import Navbar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import BlogDetails from '@/components/home/BlogDetails'
import BlogImage from '../../image/profilebackground.jpg'

export default function page() {
    const blogs = [
 {
    id: "1",
    title: "Why RTL layouts break more than you think",
    excerpt: 
    "A look at the small details that make or break Arabic UI. A look at the small details that make or break Arabic UI.A look at the small details that make or break Arabic UI.A look at the small details that make or break Arabic UI.A look at the small details that make or break Arabic UI.A look at the small details that make or break Arabic UI.A look at the small details that make or break Arabic UI.A look at the small details that make or break Arabic UI.A look at the small details that make or break Arabic UI.A look at the small details that make or break Arabic UI.A look at the small details that make or break Arabic UI.A look at the small details that make or break Arabic UI.A look at the small details that make or break Arabic UI.A look at the small details that make or break Arabic UI.A look at the small details that make or break Arabic UI.A look at the small details that make or break Arabic UI.A look at the small details that make or break Arabic UI.A look at the small details that make or break Arabic UI.",
    coverImage: BlogImage ,
    date: "July 10, 2026",
  },

   {
    id: "2",
    title: "Why RTL layouts break more than you think",
    excerpt: "A look at the small details that make or break Arabic UI.",
    coverImage: BlogImage ,
    date: "July 10, 2026",
  },
   {
    id: "3",
    title: "Why RTL layouts break more than you think",
    excerpt: "A look at the small details that make or break Arabic UI.",
    coverImage: BlogImage ,
    date: "July 10, 2026",
  },
  // ...
];

const blog = blogs.find((b) => b.id === "1");

<BlogDetails blog={blog} />
  return (
    <div>
      <Navbar/>
      <BlogDetails blog={blog} />

      <Footer/>
    </div>
  )
}
