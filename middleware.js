import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'bn'],
  defaultLocale: 'en'
});

export const config = {
  // এটি রুট পাথ এবং সকল লোকাল রাউটকে হ্যান্ডেল করবে
  matcher: ['/', '/(en|bn)/:path*']
};