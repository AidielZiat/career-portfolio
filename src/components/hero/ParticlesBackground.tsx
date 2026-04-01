import { useEffect, useRef } from 'react';

const ParticlesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const particles: HTMLDivElement[] = [];
    const particlesContainer = document.querySelector('.particles-container');
    
    if (!particlesContainer) return;
    
    // Create particles
    for (let i = 0; i < 80; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      const size = Math.random() * 4 + 1;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 30}s`;
      particle.style.animationDuration = `${Math.random() * 15 + 15}s`;
      
      // 1. Updated Hue to Green range (100-130)
      const hue = Math.random() * 30 + 100; 
      const saturation = Math.random() * 30 + 70; 
      const lightness = Math.random() * 40 + 60; 
      particle.style.backgroundColor = `hsla(${hue}, ${saturation}%, ${lightness}%, ${Math.random() * 0.5 + 0.2})`;
      
      particlesContainer.appendChild(particle);
      particles.push(particle);
    }
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();
    
    let animationFrameId: number;
    const points: { x: number; y: number; vx: number; vy: number; radius: number; connections: number[] }[] = [];
    const maxDistance = 180; 
    
    for (let i = 0; i < 120; i++) {
      points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3, // Slightly slowed down for better focus
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.5,
        connections: [],
      });
    }
    
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      points.forEach((point, i) => {
        point.x += point.vx;
        point.y += point.vy;
        
        if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1;
        point.connections = [];
        
        points.forEach((otherPoint, j) => {
          if (i !== j) {
            const dx = point.x - otherPoint.x;
            const dy = point.y - otherPoint.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < maxDistance) point.connections.push(j);
          }
        });
      });
      
      points.forEach((point, i) => {
        point.connections.forEach(j => {
          if (i < j) {
            const otherPoint = points[j];
            const dx = point.x - otherPoint.x;
            const dy = point.y - otherPoint.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const opacity = 1 - (distance / maxDistance);
            
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(otherPoint.x, otherPoint.y);
            // 2. Updated Connection Line to Green
            ctx.strokeStyle = `rgba(57, 255, 20, ${opacity * 0.12})`; 
            ctx.lineWidth = Math.min(point.radius, otherPoint.radius) * 0.5;
            ctx.stroke();
          }
        });
      });
      
      points.forEach(point => {
        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, point.radius * 4
        );
        // 3. Updated Glow and Points to Green
        gradient.addColorStop(0, 'rgba(57, 255, 20, 0.2)'); 
        gradient.addColorStop(1, 'rgba(57, 255, 20, 0)');
        
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(57, 255, 20, 0.6)'; 
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', updateCanvasSize);
      particles.forEach(particle => {
        if (particle.parentNode) particle.parentNode.removeChild(particle);
      });
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-60" />
      <div className="particles-container" />
      
      {/* 4. Updated background gradients to Green/Emerald hues */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-background" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-600 rounded-full filter blur-[180px] opacity-10 animate-float" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-emerald-800 rounded-full filter blur-[150px] opacity-10 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-green-500 rounded-full filter blur-[120px] opacity-5 animate-float" style={{ animationDelay: '4s' }} />
      </div>
    </>
  );
};

export default ParticlesBackground;