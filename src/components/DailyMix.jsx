import React, { useEffect, useRef } from "react";

function DailyMix() {
  const divRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!divRef.current) return;

      const x = e.clientX ;
      const y = e.clientY;

      divRef.current.style.transform =
        `translate(${x}px, ${y}px)`;
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={divRef}
      className="
        fixed w-2 h-2 rounded-full bg-red-600 pointer-events-none transform
        -translate-x-1/2 -translate-y-1/2 inset-0 "
    />
  );
}

export default DailyMix;
