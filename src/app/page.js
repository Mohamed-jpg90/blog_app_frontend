import Image from "next/image";
import Navbar from "@/components/layout/NavBar";
import HeroSection from "@/components/home/HeroSection";
import Footer from "@/components/layout/Footer";
import ContactPage from "@/components/contact/ContactPage";
import AllBlogs from "@/components/home/AllBlogs";
import BlogImage from '../image/profilebackground.jpg'

export default function Home() {

  const blogs = [
    {
      id: "1",
      title: "Why RTL layouts break more than you think",
      excerpt: "A look at the small details that make or break Arabic UI.",
      coverImage: BlogImage,
      date: "July 10, 2026",
    },
    {
      id: "2",
      title: "Why RTL layouts break more than you think",
      excerpt: "A look at the small details that make or break Arabic UI.",
      coverImage: BlogImage,
      date: "July 10, 2026",
    },
    {
      id: "3",
      title: "Why RTL layouts break more than you think",
      excerpt: "A look at the small details that make or break Arabic UI.",
      coverImage: BlogImage,
      date: "July 10, 2026",
    },
    {
      id: "4",
      title: "Why RTL layouts break more than you think",
      excerpt: "A look at the small details that make or break Arabic UI.",
      coverImage: BlogImage,
      date: "July 10, 2026",
    },
    {
      id: "5",
      title: "Why RTL layouts break more than you think",
      excerpt: "A look at the small details that make or break Arabic UI.",
      coverImage: BlogImage,
      date: "July 10, 2026",
    },
    // ...
  ];

  return (
    <div >
      <Navbar />
      <HeroSection />

      <AllBlogs blogs={blogs} />
      <ContactPage />
      <Footer />
    </div>
  );
}
