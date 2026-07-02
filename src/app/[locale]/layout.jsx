import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { AppProvider } from "@/context/AppContext";
import Navbar from "@/components/Navbar";

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'bn' }];
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params; // Next.js 15+/16 এ params এখন Promise, তাই await লাগবে
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <AppProvider>
        <Navbar />
        <main>{children}</main>
      </AppProvider>
    </NextIntlClientProvider>
  );
}