"use client";

import { IsMobileContext } from "@/contexts/isMobile";
import { animateScroll100VH } from "@/utils/animateScroll";
import { useContext, useEffect } from "react";

export default function Portfolio() {
  const { isMobile } = useContext(IsMobileContext);

  useEffect(() => {
    if (!isMobile) {
      animateScroll100VH();
    }
  }, [isMobile]);

  return (
    <>
      {isMobile ? null : (
        <div className="grid h-screen grid-flow-row grid-cols-1 items-center lg:grid-cols-2">
          <div className="flex justify-start p-32">
            <h1 className="text-[40px] font-bold leading-relaxed md:text-6xl lg:text-[76px]">
              Portfolio
            </h1>
          </div>
        </div>
      )}
    </>
  );
}
