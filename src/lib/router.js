'use client';

import NextLink from 'next/link';
import {
  useRouter,
  usePathname,
  useSearchParams as useNextSearchParams,
} from 'next/navigation';
import { forwardRef, useEffect, useMemo, useState } from 'react';

/** Drop-in Link: supports both `to` (RR) and `href` (Next) */
export const Link = forwardRef(function Link(
  { to, href, children, replace, className, onClick, ...rest },
  ref
) {
  const destination = href || to || '/';
  return (
    <NextLink
      ref={ref}
      href={destination}
      replace={replace}
      className={className}
      onClick={onClick}
      {...rest}
    >
      {children}
    </NextLink>
  );
});

/** Drop-in useNavigate */
export function useNavigate() {
  const router = useRouter();
  return (to, options = {}) => {
    if (typeof to === 'number') {
      if (to < 0) router.back();
      else router.forward();
      return;
    }
    if (options.replace) router.replace(to);
    else router.push(to);
  };
}

/** Drop-in useLocation — avoids useSearchParams so Navbar works without Suspense */
export function useLocation() {
  const pathname = usePathname() || '/';
  const [search, setSearch] = useState('');

  useEffect(() => {
    setSearch(window.location.search || '');
  }, [pathname]);

  return useMemo(
    () => ({
      pathname,
      search,
      hash: typeof window !== 'undefined' ? window.location.hash : '',
      state: null,
      key: 'default',
    }),
    [pathname, search]
  );
}

/** Drop-in useSearchParams — returns [URLSearchParams, setSearchParams] */
export function useSearchParams() {
  const router = useRouter();
  const pathname = usePathname();
  const nextParams = useNextSearchParams();

  const params = useMemo(() => {
    return new URLSearchParams(nextParams?.toString() || '');
  }, [nextParams]);

  const setSearchParams = (nextInit, navigateOpts = {}) => {
    const next =
      typeof nextInit === 'function'
        ? nextInit(new URLSearchParams(params))
        : nextInit;
    const sp =
      next instanceof URLSearchParams
        ? next
        : new URLSearchParams(next);
    const q = sp.toString();
    const url = q ? `${pathname}?${q}` : pathname;
    if (navigateOpts.replace) router.replace(url);
    else router.push(url);
  };

  return [params, setSearchParams];
}

/** Drop-in Navigate — client redirect */
export function Navigate({ to, replace = true }) {
  const router = useRouter();
  useEffect(() => {
    if (replace) router.replace(to);
    else router.push(to);
  }, [to, replace, router]);
  return null;
}

export { usePathname, useRouter };
