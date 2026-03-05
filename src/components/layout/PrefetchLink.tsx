import React, { useCallback } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { prefetchRoute } from '@/utils/routePrefetch';

interface PrefetchLinkProps extends LinkProps {
  to: string;
}

/** A Link that prefetches the route chunk on hover/focus for instant navigation */
const PrefetchLink = React.forwardRef<HTMLAnchorElement, PrefetchLinkProps>(
  ({ to, onMouseEnter, onFocus, ...props }, ref) => {
    const handlePrefetch = useCallback(() => {
      prefetchRoute(to);
    }, [to]);

    return (
      <Link
        ref={ref}
        to={to}
        onMouseEnter={(e) => {
          handlePrefetch();
          onMouseEnter?.(e);
        }}
        onFocus={(e) => {
          handlePrefetch();
          onFocus?.(e);
        }}
        {...props}
      />
    );
  }
);

PrefetchLink.displayName = 'PrefetchLink';

export default PrefetchLink;
