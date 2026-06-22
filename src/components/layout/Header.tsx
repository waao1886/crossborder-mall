"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import { Button } from "@/components/ui/button"
import LanguageSwitcher from "./LanguageSwitcher"
import { ShoppingCart, User, Menu, X } from "lucide-react"
import { useState } from "react"

export default function Header() {
  const t = useTranslations("nav")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <ShoppingCart className="h-6 w-6 text-primary" />
          <span className="hidden sm:inline">CrossBorder Mall</span>
          <span className="sm:hidden">CBM</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">{t("home")}</Link>
          <Link href="/search" className="text-sm font-medium hover:text-primary transition-colors">{t("search")}</Link>
          <Link href="/compare" className="text-sm font-medium hover:text-primary transition-colors">{t("compare")}</Link>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link href="/login">
            <Button variant="ghost" size="sm" className="hidden md:flex gap-2">
              <User className="h-4 w-4" />
              {t("login")}
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="flex flex-col px-4 py-2">
            <Link href="/" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>{t("home")}</Link>
            <Link href="/search" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>{t("search")}</Link>
            <Link href="/compare" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>{t("compare")}</Link>
            <Link href="/login" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>{t("login")}</Link>
          </nav>
        </div>
      )}
    </header>
  )
}
