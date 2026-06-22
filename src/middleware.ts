import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing"

const intlMiddleware = createMiddleware(routing)

export default intlMiddleware

export const config = {
  // Match all paths except static files and API routes
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|fonts).*)",
  ],
}
