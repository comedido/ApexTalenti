"use client";

import { useState } from "react";

export function useIsSpanishBrowser() {
  const [isSpanish] = useState(() => {
    if (typeof navigator === "undefined") {
      return false;
    }

    const langs =
      navigator.languages && navigator.languages.length > 0
        ? navigator.languages
        : [navigator.language];

    return langs.some((lang) => lang.toLowerCase().startsWith("es"));
  });

  return isSpanish;
}
