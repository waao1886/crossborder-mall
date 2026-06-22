"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import { useRouter } from "@/i18n/routing"
import { Button } from "@/components/ui/button"
import LanguageSwitcher from "./LanguageSwitcher"
import { ShoppingCart, User, Menu, X, ChevronDown } from "lucide-react"
import { useState, useRef, useEffect } from "react"

export default function Header() {
  const t = useTranslations("nav")
  const tHome = useTranslations("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [serversOpen, setServersOpen] = useState(false)
  const serversRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (serversRef.current && !serversRef.current.contains(e.target as Node)) {
        setServersOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <ShoppingCart className="h-6 w-6 text-primary" />
          <span className="hidden sm:inline">CrossBorder Mall</span>
          <span className="sm:hidden">CBM</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-base font-semibold hover:text-primary transition-colors">{t("home")}</Link>
          <Link href="/search" className="text-base font-semibold hover:text-primary transition-colors">{t("comparePrices")}</Link>
          <div ref={serversRef} className="relative">
            <button
              onClick={() => setServersOpen(!serversOpen)}
              className="text-base font-semibold hover:text-primary transition-colors flex items-center gap-1"
            >
              {t("services")}
              <ChevronDown className={`h-4 w-4 transition-transform ${serversOpen ? "rotate-180" : ""}`} />
            </button>
            {serversOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-card border rounded-xl shadow-lg p-2 z-50">
                <Link href="/services" onClick={() => setServersOpen(false)} className="block px-4 py-3 rounded-lg hover:bg-muted transition-colors">
                  <div className="text-sm font-semibold">📦 {t("logistics")}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">SF · Cainiao · EMS · 4PX</div>
                </Link>
                <Link href="/services" onClick={() => setServersOpen(false)} className="block px-4 py-3 rounded-lg hover:bg-muted transition-colors">
                  <div className="text-sm font-semibold">🎧 {t("agent")}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Superbuy · Wegobuy · PandaBuddy</div>
                </Link>
                <Link href="/services" onClick={() => setServersOpen(false)} className="block px-4 py-3 rounded-lg hover:bg-muted transition-colors">
                  <div className="text-sm font-semibold">✈️ {t("travel")}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Trip.com · Ctrip · China Discovery</div>
                </Link>
              </div>
            )}
          </div>
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
            <Link href="/search" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>{t("comparePrices")}</Link>
            <div className="border-t my-1" />
            <div className="text-xs font-semibold text-muted-foreground px-1 pt-2">{t("services")}</div>
            <Link href="/services" className="py-2 text-sm pl-3" onClick={() => setMobileMenuOpen(false)}>📦 {t("logistics")}</Link>
            <Link href="/services" className="py-2 text-sm pl-3" onClick={() => setMobileMenuOpen(false)}>🎧 {t("agent")}</Link>
            <Link href="/services" className="py-2 text-sm pl-3" onClick={() => setMobileMenuOpen(false)}>✈️ {t("travel")}</Link>
            <div className="border-t my-1" />
            <Link href="/login" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>{t("login")}</Link>
          </nav>
        </div>
      )}
    </header>
  )
}
