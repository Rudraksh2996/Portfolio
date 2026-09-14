"use client";

import { motion, useMotionValue, useSpring, useAnimationFrame, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Cloud, Code2, Database, Terminal, Layout, Cpu } from "lucide-react";

export default function Cube() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Auto rotation values
  const autoRotateX = useMotionValue(30);
  const autoRotateY = useMotionValue(45);

  // Mouse tracking values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for mouse follow
  const springConfig = { damping: 20, stiffness: 100 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useAnimationFrame((t, delta) => {
    if (!isHovered) {
      // Rotate 15 degrees per second
      autoRotateX.set(autoRotateX.get() - (15 * delta) / 1000);
      autoRotateY.set(autoRotateY.get() + (20 * delta) / 1000);
    }
  });

  // Calculate final rotations based on hover state
  const rotateX = useTransform(() => isHovered ? -springY.get() * 90 : autoRotateX.get());
  const rotateY = useTransform(() => isHovered ? springX.get() * 90 : autoRotateY.get());

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    // When leaving, seamlessly update auto-rotate to match current spring position
    // so it doesn't snap back. (We could use useEffect/onChange, but this is an approximation)
    autoRotateX.set(-springY.get() * 90);
    autoRotateY.set(springX.get() * 90);
    mouseX.set(0);
    mouseY.set(0);
  };

  const faces = [
    { icon: <Cloud size={48} className="text-accent-foreground" />, transform: "translateZ(100px)" },
    { icon: <Code2 size={48} className="text-accent-foreground" />, transform: "rotateY(180deg) translateZ(100px)" },
    { icon: <Database size={48} className="text-accent-foreground" />, transform: "rotateY(90deg) translateZ(100px)" },
    { icon: <Terminal size={48} className="text-accent-foreground" />, transform: "rotateY(-90deg) translateZ(100px)" },
    { icon: <Layout size={48} className="text-accent-foreground" />, transform: "rotateX(90deg) translateZ(100px)" },
    { icon: <Cpu size={48} className="text-accent-foreground" />, transform: "rotateX(-90deg) translateZ(100px)" },
  ];

  return (
    <div 
      ref={containerRef}
      className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] flex items-center justify-center cursor-grab active:cursor-grabbing perspective-[1000px]"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="w-[200px] h-[200px] relative preserve-3d"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
      >
        {faces.map((face, index) => (
          <div
            key={index}
            className="absolute top-0 left-0 w-full h-full border-2 border-accent/30 bg-background/40 backdrop-blur-sm flex items-center justify-center rounded-xl"
            style={{
              transform: face.transform,
              backfaceVisibility: "hidden",
              boxShadow: "inset 0 0 40px rgba(16, 185, 129, 0.1)"
            }}
          >
            {face.icon}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
