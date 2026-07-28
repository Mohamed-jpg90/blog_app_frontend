import React from 'react'
import Navbar from '@/components/layout/NavBar'
import AllBlogs from '@/components/home/AllBlogs'
import Footer from '@/components/layout/Footer'
import BlogImage from '../../image/profilebackground.jpg'
export default function page() {

//     const blogs = [
//   {
//     id: "1",
//     title: "Why RTL layouts break more than you think",
//     excerpt: "A look at the small details that make or break Arabic UI.",
//     coverImage: BlogImage ,
//     date: "July 10, 2026",
//   },
//     {
//     id: "2",
//     title: "Why RTL layouts break more than you think",
//     excerpt: "A look at the small details that make or break Arabic UI.",
//     coverImage: BlogImage ,
//     date: "July 10, 2026",
//   },
//     {
//     id: "3",
//     title: "Why RTL layouts break more than you think",
//     excerpt: "A look at the small details that make or break Arabic UI.",
//     coverImage: BlogImage ,
//     date: "July 10, 2026",
//   },
//     {
//     id: "4",
//     title: "Why RTL layouts break more than you think",
//     excerpt: "A look at the small details that make or break Arabic UI.",
//     coverImage: BlogImage ,
//     date: "July 10, 2026",
//   },
//     {
//     id: "5",
//     title: "Why RTL layouts break more than you think",
//     excerpt: "A look at the small details that make or break Arabic UI.",
//     coverImage: BlogImage ,
//     date: "July 10, 2026",
//   },
//   // ...
// ];


    return (
        <div>
            <Navbar />
            <AllBlogs  />
    <Footer/>
        </div>
    )
}
