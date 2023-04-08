import { useEffect } from "react";

export const useLockBodyScroll = (state: boolean) => {
  useEffect(() => {
    const body = document.body.style;
    const originalStyle = window.getComputedStyle(document.body).overflow;

    if (state) body.overflow = "hidden";

    return () => {
      body.overflow = originalStyle;
    };
  }, [state]);
};
