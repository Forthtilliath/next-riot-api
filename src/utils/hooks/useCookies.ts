import { useEffect } from 'react';
import { useCookies as useReactCookie } from 'react-cookie';

import { getLastVersion } from '@/utils/api/apiRiot';

// type Cookies = {
//   version?: string;
//   language?: string;
// };

const defaultLanguage = 'fr_FR';

const cookiesOptions = {
  path: '/',
  maxAge: Math.pow(2, 31) - 1, // Max age possible for cookies
  sameSite: true,
};

export function useCookies() {
  const [cookies, setCookie] = useReactCookie(['version', 'language']);

  const loadVersion = async () => {
    if (cookies.version) return;

    // Si aucun cookie n'existe, on met la dernière version
    const lastVersion = await getLastVersion();
    setVersion(lastVersion ?? '');
  };

  const loadLanguage = async () => {
    if (cookies.language) return;

    setVersion(defaultLanguage);
  };

  const setVersion = (data: string) => {
    setCookie('version', JSON.stringify(data), cookiesOptions);
  };

  const setLanguage = (data: string) => {
    setCookie('language', JSON.stringify(data), cookiesOptions);
  };

  useEffect(() => {
    loadVersion();
    loadLanguage();
  });

  return {
    cookies,
    setVersion,
    setLanguage,
  };
}
