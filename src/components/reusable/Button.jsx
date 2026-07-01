// components/Button.jsx
"use client";
import Link from "next/link";

const sizeClasses = {
  sm: "px-4 py-2 text-xs sm:text-sm",
  md: "px-6 py-2.5 text-sm sm:text-base",
  lg: "px-8 py-3.5 text-base sm:text-lg",
};

const variantClasses = {
  primary: "bg-green-400 text-white hover:bg-green-600",
  outline:
    "bg-transparent border-2 border-green-400 text-green-500 hover:bg-green-500 hover:text-white",
};

export default function Button({
  href,
  children,
  size = "md",
  variant = "primary",
  className = "",
  onClick,
}) {
  const base = `inline-flex items-center justify-center rounded-lg font-semibold tracking-wide transition-all duration-300 whitespace-nowrap ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

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