/* eslint-disable */
"use client";

import React, { useEffect, useRef, useState } from "react";

const CUBIES = (function () {
  const arr = [];
  let t = 0;
  const offWhite = "#FAFAF8";
  const lightGrey = "#F2F2EE";
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        // Pseudorandom spread based on trig functions to match the reference exactly
        const scatterX = 75 * Math.sin(3.7 * t + 1.2);
        const scatterY = 80 * Math.cos(2.3 * t + 0.8);
        const scatterZ = 75 * Math.sin(5.1 * t + 2.1);
        const spinX = (0.7 + (t % 4) * 0.3) * (t % 2 === 0 ? 1 : -1);
        const spinY = (0.8 + 3 * (t % 5) * 0.25) * (t % 3 === 0 ? 1 : -1);
        const spinZ = (0.6 + 7 * (t % 4) * 0.2) * (t % 2 !== 0 ? 1 : -1);

        arr.push({
          id: t,
          x,
          y,
          z,
          scatterX,
          scatterY,
          scatterZ,
          spinX,
          spinY,
          spinZ,
          faces: {
            top: "#FFFFFF",
            front: offWhite,
            right: lightGrey,
            left: lightGrey,
            bottom: "#EBEBE5",
            back: z === -1 ? offWhite : t % 2 === 0 ? "#A7F3D0" : "#D1FAE5",
          },
        });
        t++;
      }
    }
  }
  return arr;
})();

const ORBIT_INDICES = [2, 6, 10, 12, 16, 20, 24];
const ORBIT_SET = new Set(ORBIT_INDICES);

const GHOST_COUNT = 2;
const GHOST_DELAY = 3; // frames

export default function InteractiveCube() {
  const [mounted, setMounted] = useState(false);
  
  // Refs for elements
  const containerRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const cubeWrapperRef = useRef<HTMLDivElement>(null);
  const settledDotRef = useRef<HTMLDivElement>(null);
  
  // Create refs for cubies and their ghosts
  const cubieRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ghostRefs = useRef<((HTMLDivElement | null)[])[]>(Array(GHOST_COUNT).fill(null).map(() => []));
  
  // Animation state
  const rotX = useRef(-24);
  const rotY = useRef(32);
  const targetRotX = useRef(-24);
  const targetRotY = useRef(32);
  const velocityX = useRef(0);
  const velocityY = useRef(0);
  const isDragging = useRef(false);
  const scrollEased = useRef(0);
  
  const currentPos = useRef({ x: 0, y: 0 });
  const previousTransforms = useRef<any[]>([]);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    // Only drag when in idle hero state
    if (scrollEased.current > 0.1) return;
    
    isDragging.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    velocityX.current = 0;
    velocityY.current = 0;
    
    // Optional: capture pointer to continue dragging outside the element
    const target = e.target as HTMLElement;
    target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    if (scrollEased.current > 0.1) {
      isDragging.current = false;
      return;
    }

    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;
    
    const sensitivity = 0.6;
    targetRotY.current += dx * sensitivity;
    targetRotX.current -= dy * sensitivity;
    
    // Store recent velocity for inertia on release
    velocityX.current = -dy * sensitivity * 0.15;
    velocityY.current = dx * sensitivity * 0.15;
    
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    const target = e.target as HTMLElement;
    target.releasePointerCapture(e.pointerId);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let time = 0;
    let animationFrameId: number;

    const loop = () => {
      time += 0.016; // ~60fps step
      
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      const winW = window.innerWidth;
      const winH = window.innerHeight;
      
      // Calculate scroll progress (0 to 1) for the main page
      const docH = Math.max(document.documentElement.scrollHeight - winH, 1);
      const rawScroll = Math.min(1, Math.max(0, scrollY / docH));
      
      const isMobile = winW < 768;
      const cubieSpacing = (isMobile ? 68 : 84) + 4;
      
      // Target Easing for the burst effect (triggers early in the page)
      const burstProgress = Math.min(1, Math.max(0, (scrollY - 20) / 280));
      // Easing function
      scrollEased.current += (burstProgress * burstProgress * (3 - 2 * burstProgress) - scrollEased.current) * 0.12;
      const C = scrollEased.current;

      // Handle base rotation
      if (isDragging.current) {
        rotX.current += (targetRotX.current - rotX.current) * 0.45;
        rotY.current += (targetRotY.current - rotY.current) * 0.45;
      } else {
        if (Math.abs(velocityX.current) > 0.01 || Math.abs(velocityY.current) > 0.01) {
          rotX.current += velocityX.current;
          rotY.current += velocityY.current;
          velocityX.current *= 0.92;
          velocityY.current *= 0.92;
          targetRotX.current = rotX.current;
        } else {
          rotY.current += 0.1; // Auto spin
        }
        targetRotY.current = rotY.current;
      }
      rotX.current = Math.max(-65, Math.min(65, rotX.current));

      // Calculate anchor position
      let anchorX = winW * 0.8;
      let anchorY = winH * 0.65;
      const anchorEl = document.getElementById("hero-cube-anchor");
      
      if (anchorEl) {
        const rect = anchorEl.getBoundingClientRect();
        anchorX = rect.left + rect.width / 2;
        anchorY = rect.top + rect.height / 2;
      } else if (isMobile) {
        anchorX = winW * 0.5;
        anchorY = winH * 0.58;
      }

      // Parallax center drift
      const centerX = winW * 0.5;
      const centerY = winH * 0.5;
      const driftAngle = Math.atan2(anchorY - centerY, anchorX - centerX) + (2 * Math.PI * 1.5 * rawScroll + 0.35 * time) * C;
      
      let targetX = anchorX;
      let targetY = anchorY;

      if (C > 0.01) {
        const radiusX = isMobile ? 0.4 * winW : 0.44 * winW;
        const radiusY = isMobile ? 0.38 * winH : 0.42 * winH;
        const orbitX = centerX + Math.cos(driftAngle) * radiusX;
        const orbitY = centerY + Math.sin(driftAngle) * radiusY;
        targetX = anchorX + (orbitX - anchorX) * C;
        targetY = anchorY + (orbitY - anchorY) * C;
      }

      if (currentPos.current.x === 0 && currentPos.current.y === 0) {
        currentPos.current.x = anchorX;
        currentPos.current.y = anchorY;
      } else {
        currentPos.current.x += (targetX - currentPos.current.x) * 0.15;
        currentPos.current.y += (targetY - currentPos.current.y) * 0.15;
      }

      // Apply to main container
      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0px)`;
      }

      // Base cube rotations
      const finalRotX = rotX.current + 16 * Math.sin(0.002 * scrollY + 0.5 * time) * C;
      const finalRotY = rotY.current + (0.2 * scrollY + 14 * time) * C;
      const finalRotZ = (0.06 * scrollY + 10 * Math.cos(0.4 * time)) * C;
      const floatY = Math.sin(1.6 * time) * (C > 0.5 ? 10 : 6);
      const floatZ = 50 * Math.sin(driftAngle);

      if (cubeWrapperRef.current) {
        cubeWrapperRef.current.style.transform = `translate3d(0, ${floatY}px, ${(-170 + floatZ) * C}px) rotateX(${finalRotX}deg) rotateY(${finalRotY}deg) rotateZ(${finalRotZ}deg)`;
        cubeWrapperRef.current.style.pointerEvents = C > 0.05 ? "none" : "auto";
      }

      const spacingScale = (isMobile ? 65 : 100) * 0.8 * C;
      const explodeAngle = driftAngle + Math.PI / 2;
      
      // Special row/col twists during early scroll
      const twistX = C < 0.3 ? 90 * Math.min(1, Math.max(0, scrollY / 140)) : 0;
      const twistY = C < 0.3 ? 90 * Math.min(1, Math.max(0, (scrollY - 140) / 140)) : 0;
      
      const globalScale = 1 - 0.5 * C;

      // Store current transforms for ghost trails
      const currentTransforms = [];

      for (let i = 0; i < CUBIES.length; i++) {
        const cubie = CUBIES[i];
        const el = cubieRefs.current[i];
        if (!el) continue;

        const isOrbiting = ORBIT_SET.has(i);
        let opacity = 1;
        let scale = globalScale;

        if (!isOrbiting) {
          if (C <= 0.05) {
            opacity = 1;
            scale = 1;
          } else {
            const shrink = Math.max(0, 1 - (C - 0.05) / 0.28);
            opacity = shrink;
            scale = globalScale * shrink;
            if (shrink <= 0.001) {
              el.style.display = "none";
              currentTransforms.push(null);
              continue;
            }
          }
        }
        
        el.style.display = "block";
        el.style.opacity = `${opacity}`;

        let cx = cubie.x * (cubieSpacing + spacingScale);
        let cy = cubie.y * (cubieSpacing + spacingScale);
        let cz = cubie.z * (cubieSpacing + spacingScale);
        let crx = 0;
        let cry = 0;

        if (C < 0.2) {
          if (cubie.y === -1 && Math.abs(twistX) > 0.01) {
            const rad = (twistX * Math.PI) / 180;
            const nx = cx * Math.cos(rad) - cz * Math.sin(rad);
            const nz = cx * Math.sin(rad) + cz * Math.cos(rad);
            cx = nx;
            cz = nz;
            cry = twistX;
          }
          if (cubie.x === 1 && Math.abs(twistY) > 0.01) {
            const rad = (twistY * Math.PI) / 180;
            const ny = cy * Math.cos(rad) - cz * Math.sin(rad);
            const nz = cy * Math.sin(rad) + cz * Math.cos(rad);
            cy = ny;
            cz = nz;
            crx = twistY;
          }
        }

        let orbitOffsetX = 0;
        let orbitOffsetY = 0;
        
        // Intensify orbit multiplier to ensure scatter depth matching reference
        const scatterMultiplier = isOrbiting ? (isMobile ? 55 : 85) : 40;
        const baseDist = isOrbiting ? (ORBIT_INDICES.indexOf(i) - 3) : ((i - 13) / 27);
        const orbitDist = baseDist * scatterMultiplier * C * 1.5; // multiplied by 1.5 for extra extreme scatter
        
        orbitOffsetX = Math.cos(explodeAngle) * orbitDist;
        orbitOffsetY = Math.sin(explodeAngle) * orbitDist;

        // Apply extra depth offset to scattered cubes
        const depthOffset = isOrbiting ? cubie.scatterZ * C * 2 : cubie.scatterZ * C;

        const finalX = cx + cubie.scatterX * C + orbitOffsetX;
        const finalY = cy + cubie.scatterY * C + orbitOffsetY;
        const finalZ = cz + depthOffset;

        // More extreme rotations
        const rotMult = isOrbiting ? 2 : 1; 
        const finalRx = crx * (1 - C) + cubie.spinX * (0.35 * scrollY + 24 * time * rotMult) * C;
        const finalRy = cry * (1 - C) + cubie.spinY * (0.45 * scrollY + 30 * time * rotMult) * C;
        const finalRz = cubie.spinZ * (0.25 * scrollY + 18 * time * rotMult) * C;

        const transformStr = `translate3d(${finalX}px, ${finalY}px, ${finalZ}px) rotateX(${finalRx}deg) rotateY(${finalRy}deg) rotateZ(${finalRz}deg) scale3d(${scale}, ${scale}, ${scale})`;
        
        el.style.transform = transformStr;
        
        // Save for ghosts
        currentTransforms.push({
          transform: transformStr,
          opacity: isOrbiting ? (1 - Math.max(0, (C - 0.7) * 3.33)) : opacity // Fades out ghost when C > 0.7
        });
      }

      // Update history buffer for ghosts
      previousTransforms.current.unshift(currentTransforms);
      if (previousTransforms.current.length > GHOST_COUNT * GHOST_DELAY + 1) {
        previousTransforms.current.pop();
      }

      // Apply ghost transforms
      if (C > 0.05 && C < 0.95) {
        for (let g = 0; g < GHOST_COUNT; g++) {
          const histIdx = (g + 1) * GHOST_DELAY;
          const hist = previousTransforms.current[histIdx];
          for (let i = 0; i < CUBIES.length; i++) {
            const ghostEl = ghostRefs.current[g][i];
            if (!ghostEl) continue;
            
            if (hist && hist[i] && ORBIT_SET.has(i)) {
              ghostEl.style.display = "block";
              ghostEl.style.transform = hist[i].transform;
              // Fade based on age and overall burst progress
              const baseOp = g === 0 ? 0.3 : 0.15;
              ghostEl.style.opacity = `${hist[i].opacity * baseOp}`;
            } else {
              ghostEl.style.display = "none";
            }
          }
        }
      } else {
        // Hide all ghosts when settled or not bursting
        for (let g = 0; g < GHOST_COUNT; g++) {
          for (let i = 0; i < CUBIES.length; i++) {
             if (ghostRefs.current[g][i]) ghostRefs.current[g][i]!.style.display = "none";
          }
        }
      }

      // Settled Green Dot logic
      if (settledDotRef.current) {
        if (C < 0.05) {
          settledDotRef.current.style.opacity = "0";
        } else {
          settledDotRef.current.style.opacity = `${Math.min(1, (C - 0.05) * 4)}`;
          const t2 = 2.2 * time + 0.006 * scrollY;
          const radius = 85 + 55 * C;
          const px = Math.cos(t2) * radius;
          const py = 0.6 * radius * Math.sin(0.7 * t2) - 30;
          const pz = 0.8 * radius * Math.sin(t2);
          settledDotRef.current.style.transform = `translate3d(${px}px, ${py}px, ${pz}px)`;
        }
      }
      
      // Cat anchor logic removed as requested

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animationFrameId);
  }, [mounted]);

  if (!mounted) return null;

  // Render a single cubie face
  const renderFace = (transform: string, bg: string, isGhost = false, isAccent = false) => {
    return (
      <div
        className="absolute inset-0 backface-hidden"
        style={{
          transform,
          backgroundColor: isGhost ? "transparent" : bg,
          border: isGhost ? "1px dashed #666" : "2px solid #1a1a1a",
          borderRadius: "12px",
          ...(isAccent && !isGhost ? { backgroundColor: "#A7F3D0" } : {})
        }}
      />
    );
  };

  const renderCubie = (cubie: any, refArray: any, index: number, isGhost = false) => {
    // Cube 2 front face is the persistent green accent during scatter
    const isSpecialAccent = index === 2;

    return (
      <div
        key={`${cubie.id}-${isGhost}`}
        ref={(el) => { refArray[index] = el; }}
        className="absolute w-[80px] h-[80px] -ml-[40px] -mt-[40px]"
        style={{
          transformStyle: "preserve-3d",
          display: isGhost ? "none" : "block"
        }}
      >
        {renderFace("rotateY(0deg) translateZ(40px)", cubie.faces.front, isGhost, isSpecialAccent)}
        {renderFace("rotateY(180deg) translateZ(40px)", cubie.faces.back, isGhost)}
        {renderFace("rotateY(90deg) translateZ(40px)", cubie.faces.right, isGhost)}
        {renderFace("rotateY(-90deg) translateZ(40px)", cubie.faces.left, isGhost)}
        {renderFace("rotateX(90deg) translateZ(40px)", cubie.faces.top, isGhost)}
        {renderFace("rotateX(-90deg) translateZ(40px)", cubie.faces.bottom, isGhost)}
      </div>
    );
  };

  return (
    <>
      <div
        id="hero-cube-anchor"
        ref={anchorRef}
        className="absolute w-[10px] h-[10px] pointer-events-none"
        style={{ top: "50%", right: "20%" }}
      />
      <div
        className="fixed inset-0 pointer-events-none select-none z-10"
        style={{ perspective: "1100px" }}
      >
        <div ref={containerRef} className="absolute w-[10px] h-[10px] transform-gpu">
          <div 
            ref={cubeWrapperRef} 
            className="absolute transform-gpu cursor-grab active:cursor-grabbing w-[160px] h-[160px] -ml-[80px] -mt-[80px]" 
            style={{ transformStyle: "preserve-3d", touchAction: "none", pointerEvents: "auto" }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            
            {/* Ghosts */}
            {Array.from({ length: GHOST_COUNT }).map((_, g) => (
              <div key={`ghost-layer-${g}`} className="absolute" style={{ transformStyle: "preserve-3d" }}>
                {CUBIES.map((cubie, i) => renderCubie(cubie, ghostRefs.current[g], i, true))}
              </div>
            ))}

            {/* Main Cubes */}
            <div className="absolute" style={{ transformStyle: "preserve-3d" }}>
              {CUBIES.map((cubie, i) => renderCubie(cubie, cubieRefs.current, i, false))}
            </div>

            {/* Settled floating dot */}
            <div
              ref={settledDotRef}
              className="absolute w-3 h-3 rounded-full bg-[#A7F3D0] blur-[2px] animate-pulse"
              style={{ opacity: 0 }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

