


import Navbar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import BlogDetails from "@/components/home/BlogDetails";
import axios from "axios";
import BaseUrl from "@/config/api";
// import { getToken } from "@/features/Token";

export default async function Page({ params }) {
  const { id } = await params;
//  const token= getToken()
  const res = await axios.get(`${BaseUrl}/api/blog/${id}`);

  const blog = res.data.blog;

  return (
    <div>
      <Navbar />
      <BlogDetails blog={blog} />
      <Footer />
    </div>
  );
}