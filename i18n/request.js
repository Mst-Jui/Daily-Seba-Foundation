// import { getRequestConfig } from "next-intl/server";

// export default getRequestConfig(async ({ locale }) => ({
//   messages: (await import(`../messages/${locale}.json`)).default,
// }));



import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

const locales = ['en', 'bn'];

export default getRequestConfig(async ({ locale }) => {
  // যদি locale সাপোর্ট না করে, তবে 404 দেখাবে
  if (!locales.includes(locale)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});