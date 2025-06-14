import { useEffect, useRef } from "react";

export default function MathBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const mathSymbols = ["∫", "∑", "∂", "π", "α", "β", "γ", "δ", "θ", "λ", "∞", "≈", "≤", "≥", "∇", "∆"];
    const floatingSymbols: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      symbol: string;
      size: number;
      opacity: number;
      rotation: number;
      rotationSpeed: number;
    }> = [];

    const initSymbols = () => {
      floatingSymbols.length = 0;
      for (let i = 0; i < 30; i++) {
        floatingSymbols.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          symbol: mathSymbols[Math.floor(Math.random() * mathSymbols.length)],
          size: Math.random() * 20 + 15,
          opacity: Math.random() * 0.1 + 0.02,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.01,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      floatingSymbols.forEach((symbol) => {
        // Update position
        symbol.x += symbol.vx;
        symbol.y += symbol.vy;
        symbol.rotation += symbol.rotationSpeed;

        // Wrap around edges
        if (symbol.x < -50) symbol.x = canvas.width + 50;
        if (symbol.x > canvas.width + 50) symbol.x = -50;
        if (symbol.y < -50) symbol.y = canvas.height + 50;
        if (symbol.y > canvas.height + 50) symbol.y = -50;

        // Draw symbol
        ctx.save();
        ctx.translate(symbol.x, symbol.y);
        ctx.rotate(symbol.rotation);
        ctx.font = `${symbol.size}px Inter`;
        ctx.fillStyle = `rgba(59, 130, 246, ${symbol.opacity})`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(symbol.symbol, 0, 0);
        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initSymbols();
    animate();

    const handleResize = () => {
      resizeCanvas();
      initSymbols();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}