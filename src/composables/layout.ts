import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

export function useBasicLayout() {
  const mode = 'vertical';
  const headerProps = {
    showLogo: false,
    showHeaderMenu: false,
    showMenuCollapse: true
  };
  const breakpoints = useBreakpoints(breakpointsTailwind);
  const isMobile = breakpoints.smaller('sm');

  return {
    mode,
    isMobile,
    headerProps
  };
}
