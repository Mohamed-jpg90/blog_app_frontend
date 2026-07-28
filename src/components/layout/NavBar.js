"use client";

import Link from "next/link";
import { useState } from "react";
// import Button from "./Button";
import Image from "next/image";
import Button from "../shared/Button";
// import "./Navbar.css";
import './layout.css'
import img from '../../image/logo.jpg'
import { useRouter } from "next/navigation";
const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [hovered, setHovered] = useState(null);
  const router  = useRouter()

  return (
    <header className="header">
      <nav className="nav">
        {/* Logo */}
        <Link href="/" className="logo">
          <div className="logoIcon">
            <Image style={{borderRadius: "15px"}}  src={img} alt="logo"/>
          </div>
          <span className="logoText">Blogs</span>
        </Link>

        {/* Center links */}
        <ul
          className="links"
          onMouseLeave={() => setHovered(null)}
        >
          {navLinks.map((link, i) => (
            <li
              key={link.href}
              className="linkItem"
              onMouseEnter={() => setHovered(i)}
            >
              <Link href={link.href} className="link">
                {link.label}
              </Link>

              {hovered === i && <span className="linkHoverBg" />}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="flex flex-row gap-4" >
            <Button variant="primary" onClick={()=>{router.push('/login')}} >login</Button>
        <Button variant="primary">Book a call</Button>
        </div>
      
      </nav>
    </header>
  );
}