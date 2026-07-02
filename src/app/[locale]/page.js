import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // আপনার সাপোর্ট করা ল্যাঙ্গুয়েজগুলো এখানে দিন
  locales: ['en', 'bn'],
  defaultLocale: 'en'
});

// export const config = {
//   // এটি রুট পাথ এবং অন্যান্য সমস্ত লোকাল রাউটকে হ্যান্ডেল করবে
//   matcher: ['/', '/(en|bn)/:path*']
// };