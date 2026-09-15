"use client";

import { useEffect } from "react";

export default function Oneko() {
  useEffect(() => {
    const isReducedMotion = window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

    if (isReducedMotion || document.getElementById("oneko-wrapper")) return;

    const nekoEl = document.createElement("div");
    let nekoPosX = 140;
    let nekoPosY = 140;
    
    let mousePosX = 140;
    let mousePosY = 140;

    let frameCount = 0;
    let idleTime = 0;
    let idleAnimation: string | null = null;
    let idleAnimationFrame = 0;

    let lastFrameTimestamp: number | undefined;
    let lastInteractionTime = performance.now();
    let isWandering = false;
    let wanderTargetX = mousePosX;
    let wanderTargetY = mousePosY;

    const nekoSpeed = 10;
    const spriteSets: Record<string, number[][]> = {
      idle: [[-3, -3]],
      alert: [[-7, -3]],
      scratchSelf: [
        [-5, 0],
        [-6, 0],
        [-7, 0],
      ],
      scratchWallN: [
        [0, 0],
        [0, -1],
      ],
      scratchWallS: [
        [-7, -1],
        [-6, -2],
      ],
      scratchWallE: [
        [-2, -2],
        [-2, -3],
      ],
      scratchWallW: [
        [-4, 0],
        [-4, -1],
      ],
      tired: [[-3, -2]],
      sleeping: [
        [-2, 0],
        [-2, -1],
      ],
      N: [
        [-1, -2],
        [-1, -3],
      ],
      NE: [
        [0, -2],
        [0, -3],
      ],
      E: [
        [-3, 0],
        [-3, -1],
      ],
      SE: [
        [-5, -1],
        [-5, -2],
      ],
      S: [
        [-6, -3],
        [-7, -2],
      ],
      SW: [
        [-5, -3],
        [-6, -1],
      ],
      W: [
        [-4, -2],
        [-4, -3],
      ],
      NW: [
        [-1, 0],
        [-1, -1],
      ],
    };

    function init() {
      nekoEl.id = "oneko";
      nekoEl.ariaHidden = "true";
      nekoEl.style.width = "38px";
      nekoEl.style.height = "38px";
      nekoEl.style.position = "absolute";
      nekoEl.style.pointerEvents = "auto";
      nekoEl.style.cursor = "pointer";
      nekoEl.style.imageRendering = "pixelated";
      nekoEl.style.left = "0";
      nekoEl.style.top = "0";
      nekoEl.style.backgroundImage = `url('https://raw.githubusercontent.com/adryd325/oneko.js/main/oneko.gif')`;
      nekoEl.style.backgroundSize = "calc(38px * 8) calc(38px * 4)";
      nekoEl.style.filter = "invert(0.95) contrast(1.8) drop-shadow(0 3px 6px rgba(0, 0, 0, 0.35))";
      
      const speechBubble = document.createElement("div");
      speechBubble.id = "oneko-speech";
      speechBubble.innerText = "purrr";
      speechBubble.style.position = "absolute";
      speechBubble.style.top = "-24px";
      speechBubble.style.left = "50%";
      speechBubble.style.transform = "translateX(-50%)";
      speechBubble.style.backgroundColor = "white";
      speechBubble.style.border = "1px solid #e6e6e6";
      speechBubble.style.borderRadius = "8px";
      speechBubble.style.padding = "2px 6px";
      speechBubble.style.fontSize = "10px";
      speechBubble.style.fontWeight = "bold";
      speechBubble.style.color = "#1a1a1a";
      speechBubble.style.opacity = "0";
      speechBubble.style.transition = "opacity 0.2s";
      speechBubble.style.pointerEvents = "none";
      speechBubble.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
      
      const wrapper = document.createElement("div");
      wrapper.id = "oneko-wrapper";
      wrapper.style.position = "fixed";
      wrapper.style.left = `${nekoPosX - 19}px`;
      wrapper.style.top = `${nekoPosY - 19}px`;
      wrapper.style.width = "38px";
      wrapper.style.height = "38px";
      wrapper.style.zIndex = "999999";
      wrapper.style.pointerEvents = "none";
      wrapper.className = "transition-all duration-300 dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]";
      
      wrapper.appendChild(nekoEl);
      wrapper.appendChild(speechBubble);
      document.body.appendChild(wrapper);

      const clickHandler = (e: MouseEvent) => {
        e.stopPropagation();
        idleAnimation = "tamed";
        setSprite("alert", 0);
        speechBubble.style.opacity = "1";
        setTimeout(() => {
          speechBubble.style.opacity = "0";
        }, 2000);
      };
      nekoEl.addEventListener("click", clickHandler);

      const mouseHandler = function (event: MouseEvent) {
        mousePosX = event.clientX;
        mousePosY = event.clientY;
        lastInteractionTime = performance.now();
      };
      const touchHandler = function (event: TouchEvent) {
        if (event.touches.length > 0) {
          mousePosX = event.touches[0].clientX;
          mousePosY = event.touches[0].clientY;
          lastInteractionTime = performance.now();
        }
      };
      document.addEventListener("mousemove", mouseHandler);
      document.addEventListener("touchstart", touchHandler, { passive: true });
      document.addEventListener("touchmove", touchHandler, { passive: true });

      let frameId = window.requestAnimationFrame(onAnimationFrame);

      return { 
        wrapper, 
        clickHandler, 
        mouseHandler, 
        touchHandler,
        getFrameId: () => frameId, 
        setFrameId: (id: number) => { frameId = id; } 
      };
    }

    const { wrapper: elWrapper, clickHandler, mouseHandler, touchHandler, getFrameId, setFrameId } = init() || {};

    function onAnimationFrame(timestamp: number) {
      const wrapper = document.getElementById("oneko-wrapper");
      if (!wrapper) return;
      
      if (!lastFrameTimestamp) {
        lastFrameTimestamp = timestamp;
      }
      if (timestamp - lastFrameTimestamp > 100) {
        lastFrameTimestamp = timestamp;
        frame();
      }
      if (setFrameId) {
        setFrameId(window.requestAnimationFrame(onAnimationFrame));
      } else {
        window.requestAnimationFrame(onAnimationFrame);
      }
    }

    function setSprite(name: string, frame: number) {
      const sprite = spriteSets[name][frame % spriteSets[name].length];
      nekoEl.style.backgroundPosition = `${sprite[0] * 38}px ${sprite[1] * 38}px`;
    }

    function resetIdleAnimation() {
      idleAnimation = null;
      idleAnimationFrame = 0;
    }

    function idle() {
      idleTime += 1;

      if (
        idleTime > 10 &&
        Math.floor(Math.random() * 200) == 0 &&
        idleAnimation == null
      ) {
        let avalibleIdleAnimations = ["sleeping", "scratchSelf"];
        if (nekoPosX < 32) {
          avalibleIdleAnimations.push("scratchWallW");
        }
        if (nekoPosY < 32) {
          avalibleIdleAnimations.push("scratchWallN");
        }
        if (nekoPosX > window.innerWidth - 32) {
          avalibleIdleAnimations.push("scratchWallE");
        }
        if (nekoPosY > window.innerHeight - 32) {
          avalibleIdleAnimations.push("scratchWallS");
        }
        idleAnimation =
          avalibleIdleAnimations[
            Math.floor(Math.random() * avalibleIdleAnimations.length)
          ];
      }

      switch (idleAnimation) {
        case "sleeping":
          if (idleAnimationFrame < 8) {
            setSprite("tired", 0);
            break;
          }
          setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
          if (idleAnimationFrame > 192) {
            resetIdleAnimation();
          }
          break;
        case "scratchWallN":
        case "scratchWallS":
        case "scratchWallE":
        case "scratchWallW":
        case "scratchSelf":
          setSprite(idleAnimation, idleAnimationFrame);
          if (idleAnimationFrame > 9) {
            resetIdleAnimation();
          }
          break;
        case "tamed":
          // Special state for click
          setSprite("alert", 0);
          if (idleAnimationFrame > 15) {
             resetIdleAnimation();
          }
          break;
        default:
          setSprite("idle", 0);
          return;
      }
      idleAnimationFrame += 1;
    }

    function frame() {
      frameCount += 1;
      
      const now = performance.now();
      
      // Wander logic: if no interaction for 3 seconds, pick a new random target nearby
      if (now - lastInteractionTime > 3000) {
        if (!isWandering) {
          isWandering = true;
          wanderTargetX = nekoPosX + (Math.random() - 0.5) * 200;
          wanderTargetY = nekoPosY + (Math.random() - 0.5) * 200;
          
          // Constrain to viewport
          wanderTargetX = Math.max(32, Math.min(window.innerWidth - 32, wanderTargetX));
          wanderTargetY = Math.max(32, Math.min(window.innerHeight - 32, wanderTargetY));
        }
      } else {
        isWandering = false;
      }

      const targetX = isWandering ? wanderTargetX : mousePosX;
      const targetY = isWandering ? wanderTargetY : mousePosY;
      const diffX = nekoPosX - targetX;
      const diffY = nekoPosY - targetY;
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

      const wrapper = document.getElementById("oneko-wrapper");
      if (!wrapper) return;

      if (distance < nekoSpeed || distance < 48) {
        if (isWandering && now - lastInteractionTime > 3000) {
          // Re-trigger wander after a delay
          if (Math.random() < 0.05) { // 5% chance per frame to pick new wander target once reached
            isWandering = false; 
            lastInteractionTime = now - 2000; // Force new target soon
          }
        }
        idle();
        return;
      }

      idleAnimation = null;
      idleAnimationFrame = 0;

      if (idleTime > 1) {
        setSprite("alert", 0);
        idleTime = Math.min(idleTime, 7);
        idleTime -= 1;
        return;
      }

      let direction;
      direction = diffY / distance > 0.5 ? "N" : "";
      direction += diffY / distance < -0.5 ? "S" : "";
      direction += diffX / distance > 0.5 ? "W" : "";
      direction += diffX / distance < -0.5 ? "E" : "";
      setSprite(direction, frameCount);

      nekoPosX -= (diffX / distance) * nekoSpeed;
      nekoPosY -= (diffY / distance) * nekoSpeed;

      nekoPosX = Math.min(Math.max(19, nekoPosX), window.innerWidth - 19);
      nekoPosY = Math.min(Math.max(19, nekoPosY), window.innerHeight - 19);

      wrapper.style.left = `${nekoPosX - 19}px`;
      wrapper.style.top = `${nekoPosY - 19}px`;
    }

    init();

    return () => {
      const wrapper = document.getElementById("oneko-wrapper");
      if (wrapper) wrapper.remove();
      if (mouseHandler) document.removeEventListener("mousemove", mouseHandler);
      if (touchHandler) {
        document.removeEventListener("touchstart", touchHandler);
        document.removeEventListener("touchmove", touchHandler);
      }
      const frameId = getFrameId?.();
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return null;
}
