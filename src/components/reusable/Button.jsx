"use client";
import Link from "next/link";

const sizeClasses = {
  sm: "px-4 py-2 text-xs sm:text-sm",
  md: "px-6 py-2.5 text-sm sm:text-base",
  lg: "px-8 py-3.5 text-base sm:text-lg",
};

const variantClasses = {
  // ব্লু-টিল গ্রেডিয়েন্ট উইথ জুম এবং লিফট ইফেক্ট
  primary: `
    bg-gradient-to-r from-blue-600 to-teal-400 
    text-white 
    shadow-lg shadow-teal-500/30 
    hover:-translate-y-2 
    hover:scale-105 
    hover:shadow-2xl hover:shadow-teal-500/50
  `,
  
  // আউটলাইন স্টাইল
  outline: `
    bg-transparent 
    border-2 border-blue-500 
    text-blue-600 
    hover:bg-blue-500 hover:text-white 
    hover:-translate-y-2 
    hover:scale-105
  `,
};

export default function Button({
  href,
  children,
  size = "md",
  variant = "primary",
  className = "",
  onClick,
}) {
  const base = `inline-flex items-center justify-center rounded-lg font-semibold tracking-wide transition-all duration-300 ease-in-out whitespace-nowrap ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={base}>
      {children}
    </button>
  );
}