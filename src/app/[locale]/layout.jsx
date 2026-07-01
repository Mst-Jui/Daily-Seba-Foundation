import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { AppProvider } from "@/context/AppContext";
import Navbar from "@/components/Navbar";

export default async function LocaleLayout({ children, params: { locale } }) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AppProvider>
            <Navbar />
            <main>{children}</main>
          </AppProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}