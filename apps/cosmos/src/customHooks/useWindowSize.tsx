import { useState, useEffect } from "react";

export const enum Breakpoint {
  SM = 512,
  MD = 768,
  LG = 1024,
  XL = 1280,
  XXL = 1536
}

export interface WindowSize {
  width: number;
  height: number;
  isMobile: boolean;
}

export function useWindowSize(
  maxMobileWidth: Breakpoint = Breakpoint.MD
): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
    isMobile: false
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth <= maxMobileWidth
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [maxMobileWidth]);

  return windowSize;
}
