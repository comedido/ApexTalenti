"use client";

import { useEffect, useState } from "react";

export function useIsSpanishBrowser() {
  const [isSpanish, setIsSpanish] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof navigator === "undefined") return;

    const langs = navigator.languages?.length
      ? navigator.languages
      : [navigator.language];

    const isEs = langs.some((lang) => lang.toLowerCase().startsWith("es"));
    setIsSpanish(isEs);
  }, []);

  return isSpanish;
}
