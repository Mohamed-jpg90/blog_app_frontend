"use client";

// import "./Button.css";
import './shared.css'

export default function Button({
  children,
  variant = "primary",
  onClick,
  
  type = "button",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn ${variant} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

// "use client"
// import Link from "next/link"

// export default function Button({
// text ,
// to
// }){
//   return (
//     <>
//     <Link className="py-5 px-2.5  " href={to} >
//     {text}
    
//     </Link>
    
    
//     </>
// //   )
// }