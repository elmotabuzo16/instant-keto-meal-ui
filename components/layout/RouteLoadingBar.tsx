'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const RouteLoadingBar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const firstRender = useRef(true);
  const [visible, setVisible] = useState(false);
  const hideTimer = useRef<number | null>(null);

  const showProgress = () => {
    if (hideTimer.current) {
      window.clearTimeout(hideTimer.current);
    }

    setVisible(true);
  };

  const hideProgress = () => {
    if (hideTimer.current) {
      window.clearTimeout(hideTimer.current);
    }

    hideTimer.current = window.setTimeout(() => setVisible(false), 900);
  };

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target instanceof Element
        ? event.target.closest<HTMLAnchorElement>('a[href]')
        : null;

      if (!target || target.target === '_blank') {
        return;
      }

      const href = target.getAttribute('href');

      if (!href || href.startsWith('#')) {
        return;
      }

      const url = new URL(href, window.location.href);

      if (url.origin !== window.location.origin) {
        return;
      }

      if (url.pathname === window.location.pathname && url.search === window.location.search) {
        return;
      }

      showProgress();
    };

    document.addEventListener('click', handleClick, { capture: true });

    return () => {
      document.removeEventListener('click', handleClick, { capture: true });
      if (hideTimer.current) {
        window.clearTimeout(hideTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    hideProgress();
  }, [pathname, searchParams]);

  if (!visible) {
    return null;
  }

  return (
    <div aria-label="Loading" role="status" className="fixed left-0 top-0 z-[9999] h-1 w-full">
      <div className="keto-top-loader h-full bg-[#4A2518]" />
    </div>
  );
};

export default RouteLoadingBar;
