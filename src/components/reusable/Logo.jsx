import { House } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Logo = () => {
  return (
    <div>
      <Link href="/" className="flex items-center gap-2 mb-4">
        <div className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center shrink-0">
          <House className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-lg">Daily Seba</span>
      </Link>
    </div>
  );
};

export default Logo;