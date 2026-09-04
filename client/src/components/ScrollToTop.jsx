import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component ensures that whenever the route changes,
 * the viewport automatically scrolls back to the top of the page.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant', // Jump immediately on page change
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
