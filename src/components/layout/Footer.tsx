"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import { ShoppingCart } from "lucide-react"

export default function Footer() {
  const t = useTranslations("footer")

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingCart className="h-5 w-5 text-primary" />
              <span className="font-bold">CrossBorder Mall</span>
            </div>
            <p className="text-sm text-muted-foreground">{t("aboutText")}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/services" className="hover:text-foreground">Service Directory</Link></li>
              <li><Link href="/china" className="hover:text-foreground">China Portal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">{t("help")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/faq" className="hover:text-foreground">{t("faq")}</Link></li>
              <li><Link href="/contact" className="hover:text-foreground">{t("contact")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">{t("legal")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-foreground">{t("privacy")}</Link></li>
              <li><Link href="/terms" className="hover:text-foreground">{t("terms")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/search" className="hover:text-foreground">Search</Link></li>
              <li><Link href="/compare" className="hover:text-foreground">Compare</Link></li>
              <li><Link href="/membership" className="hover:text-foreground">Membership</Link></li>
              <li><Link href="/referral" className="hover:text-foreground">Referral</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>{t("copyright")}</p>
        </div>
      </div>
    </footer>
  )
}
