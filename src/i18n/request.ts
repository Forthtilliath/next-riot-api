import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  const [common, champions, items] = await Promise.all([
    import(`../locales/${locale}/common.json`),
    import(`../locales/${locale}/champions.json`),
    import(`../locales/${locale}/items.json`),
  ]);

  return {
    locale,
    messages: {
      common: common.default,
      champions: champions.default,
      items: items.default,
    },
  };
});
