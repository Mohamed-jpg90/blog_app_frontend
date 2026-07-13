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