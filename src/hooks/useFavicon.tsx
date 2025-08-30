// src/hooks/useFavicon.ts
import { useEffect } from 'react';

export const useFavicon = (emoji: string) => {
  useEffect(() => {
    const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement || document.createElement('link');
    link.type = 'image/svg+xml';
    link.rel = 'icon';
    link.href = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${encodeURIComponent(emoji)}</text></svg>`;
    document.head.appendChild(link);
  }, [emoji]);
};
