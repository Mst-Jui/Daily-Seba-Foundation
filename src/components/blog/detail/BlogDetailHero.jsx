"use client";
import Image from "next/image";

export default function BlogDetailHero({ image, title, category }) {
  return (
    <div className="relative h-56 sm:h-72 md:h-96 w-full overflow-hidden">
      <Image
        src={image}
        alt={title}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1220] via-[#0a1220]/60 to-[#0a1220]/10" />
      <div className="absolute bottom-0 left-0 right-0 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
        <span className="inline-block bg-gradient-to-r from-blue-600 to-teal-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 shadow-md">
          {category}
        </span>
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white leading-snug max-w-3xl">
          {title}
        </h1>
      </div>
    </div>
  );
}