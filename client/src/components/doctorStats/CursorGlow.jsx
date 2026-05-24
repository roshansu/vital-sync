import { colors } from "../../constant/style";
import { useEffect, useRef } from "react";

export  default function CursorGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (!glowRef.current) return;
      glowRef.current.style.left = `${e.clientX}px`;
      glowRef.current.style.top  = `${e.clientY}px`;
      glowRef.current.style.opacity = "1";
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed pointer-events-none z-0 hidden md:block"
      style={{
        width: 256,
        height: 256,
        borderRadius: "50%",
        background: `${colors.primary}07`,
        filter: "blur(100px)",
        transform: "translate(-50%, -50%)",
        opacity: 0,
        transition: "opacity 0.3s ease",
      }}
    />
  );
}
