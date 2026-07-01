// import createMiddleware from "next-intl/middleware";

// export default createMiddleware({
//   locales: ["en", "bn"],
//   defaultLocale: "en",
// });

// export const config = {
//   matcher: ["/((?!api|_next|.*\\..*).*)"],
// };







// import { NextResponse } from 'next/server';

// export function middleware(request) {
//   const { pathname } = request.nextUrl;

//   // যদি রুট ইউআরএল হয়, তবে ডিফল্ট ল্যাঙ্গুয়েজ '/en'-এ রিডাইরেক্ট করুন
//   if (pathname === '/') {
//     return NextResponse.redirect(new URL('/en', request.url));
//   }

//   return NextResponse.next();
// }

// // শুধুমাত্র রুট পাথেই এই মিডলওয়্যার কাজ করবে
// export const config = {
//   matcher: '/',
// };



import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // যদি রুট পাথ হয়, তবেই /en এ রিডাইরেক্ট করুন
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/en', request.url));
  }

  return NextResponse.next();
}

// matcher থেকে শুধু '/' রাখুন, কারণ '/en' আমাদের অ্যাপের ভেতর থেকে হ্যান্ডেল হচ্ছে
export const config = {
  matcher: ['/'],
};