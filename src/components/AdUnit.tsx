"use client";

import { useEffect, useRef } from "react";

interface AdUnitProps {
  slot: string;
  format?: "auto" | "horizontal" | "vertical" | "rectangle";
}

export default function AdUnit({ slot, format = "auto" }: AdUnitProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_ADSENSE_ID) return;
    if (pushed.current) return;
    pushed.current = true;

    try {
      ((window as unknown as Record<string, unknown[]>).adsbygoogle =
        (window as unknown as Record<string, unknown[]>).adsbygoogle || []).push({});
    } catch {}
  }, []);

  if (!process.env.NEXT_PUBLIC_ADSENSE_ID) return null;

  return (
    <div ref={adRef} className="flex justify-center">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
