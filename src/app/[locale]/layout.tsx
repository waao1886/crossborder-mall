import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  if (!routing.locales.includes(params.locale as "en" | "th" | "vi" | "id" | "ms" | "km" | "lo" | "ar")) {
    notFound()
  }

  const messages = await getMessages()
  const isRTL = params.locale === "ar"

  return (
    <NextIntlClientProvider messages={messages} locale={params.locale}>
      <div dir={isRTL ? "rtl" : "ltr"} className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  )
}
