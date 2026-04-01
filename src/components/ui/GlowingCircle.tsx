import React, { useEffect, useRef } from 'react';

const NetworkPulse = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 350; 
    };
    
    window.addEventListener('resize', updateSize);
    updateSize();
    
    let animationFrameId: number;
    const particles: Particle[] = [];
    const particleCount = 60; 
    const connectionDistance = 150;
    const pulseSpeed = 0.02;
    
    // 1. Theme Color Updated to Neon Green (matching your AI & Data vibe)
    const primaryColor = '57, 255, 20'; 
    
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      pulse: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4; // Slightly slowed down for better focus
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 2 + 1;
        this.pulse = Math.random() * Math.PI;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.pulse += pulseSpeed;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        const opacity = (Math.sin(this.pulse) + 1) / 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${primaryColor}, ${0.3 + opacity * 0.4})`;
        ctx.fill();
        
        // Node Glow
        ctx.shadowBlur = 12 * opacity; // Increased glow slightly for neon effect
        ctx.shadowColor = `rgba(${primaryColor}, 0.5)`;
      }
    }

    const init = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = 'rgba(10, 10, 10, 0)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update();
        p1.draw();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            
            const edgeOpacity = 1 - distance / connectionDistance;
            ctx.strokeStyle = `rgba(${primaryColor}, ${edgeOpacity * 0.12})`; // Softer edges for cleaner look
            ctx.lineWidth = 1;
            ctx.stroke();

            // "Agentic Pulse" - Light traveling between nodes
            if (Math.sin(p1.pulse) > 0.98) {
               ctx.beginPath();
               ctx.moveTo(p1.x, p1.y);
               ctx.lineTo(p2.x, p2.y);
               ctx.strokeStyle = `rgba(${primaryColor}, ${edgeOpacity * 0.7})`;
               ctx.lineWidth = 1.5;
               ctx.stroke();
            }
          }
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    init();
    draw();

    return () => {
      window.removeEventListener('resize', updateSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="w-full h-[350px] overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none z-10" />
      <canvas 
        ref={canvasRef} 
        className="w-full h-full opacity-50" // Lowered opacity slightly to keep focus on text
      />
    </div>
  );
};

export default NetworkPulse;