'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, children, className, onClick }) => {
  const pathName = usePathname();
  const isActive = href === pathName;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`pb-1 transition-all duration-200 font-semibold border-b-2
        ${isActive
          ? "border-green-500"
          : "border-transparent hover:border-green-500"
        } ${className}`}
    >
      {children}
    </Link>
  );
};

export default NavLink;