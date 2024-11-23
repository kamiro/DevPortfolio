import { routing } from '@/i18n/routing';
import createMiddleware from 'next-intl/middleware';

export default createMiddleware(routing);

const localesString = routing.locales.join('|');
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', `/(${localesString})/:path*`]
};