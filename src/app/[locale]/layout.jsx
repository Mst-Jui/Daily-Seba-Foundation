import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export default async function LocaleLayout({ children, params }) {
  // paramsawait করা জরুরি
  const { locale } = await params;

  // মিডলওয়্যার থেকে locale পাওয়ার পর সরাসরি getMessages() কল করুন
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}