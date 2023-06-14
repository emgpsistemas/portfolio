"use client";

export default function Contato() {
  const isMobile = window.innerWidth <= 768;
  return (
    <>
      {isMobile ? null : (
        <div className="grid h-screen grid-flow-row grid-cols-1 items-center lg:grid-cols-2">
          <div className="flex justify-start p-32">
            <h1 className="text-[40px] font-bold leading-relaxed md:text-6xl lg:text-[76px]">
              Contato
            </h1>
          </div>
        </div>
      )}
    </>
  );
}
