import { useEffect, useRef } from 'react';

const AnimatedLogo = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const updateSize = () => {
      canvas.width = 60;
      canvas.height = 60;
    };
    
    updateSize();
    
    let animationFrameId: number;
    let particlesArray: Particle[] = [];
    const numberOfParticles = 20;
    
    // Theme Colors synced with your portfolio's orange
    // const primaryColor = 'rgba(249, 115, 22, 1)'; 
    // const particleColor = 'rgba(249, 115, 22, 0.4)';
    const primaryColor = 'rgba(57, 255, 20, 1)'; // Neon Green
    const particleColor = 'rgba(57, 255, 20, 0.2)'; // Fainter particles for better clarity

    class Particle {
      x: number; y: number; size: number; speedX: number; speedY: number;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }
      
      draw() {
        if (!ctx) return;
        ctx.fillStyle = particleColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    function init() {
      particlesArray = [];
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }
    
    // Drawing the initials "AZ"
    function drawAZ() {
      if (!ctx) return;
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      // --- DRAW "A" (Left side) ---
      ctx.beginPath();
      ctx.moveTo(15, 15); // Apex
      ctx.lineTo(5, 45);  // Bottom Left
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(15, 15); // Apex
      ctx.lineTo(25, 45); // Bottom Right
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(10, 32); // Crossbar
      ctx.lineTo(20, 32);
      ctx.stroke();

      // --- DRAW "Z" (Right side) ---
      ctx.beginPath();
      ctx.moveTo(35, 15); // Top Left
      ctx.lineTo(55, 15); // Top Right
      ctx.lineTo(35, 45); // Bottom Left
      ctx.lineTo(55, 45); // Bottom Right
      ctx.stroke();
    }
    
    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      drawAZ();
      animationFrameId = requestAnimationFrame(animate);
    }
    
    init();
    animate();
    
    return () => cancelAnimationFrame(animationFrameId);
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="w-[30px] h-[30px] md:w-[45px] md:h-[45px] drop-shadow-[0_0_8px_rgba(249,115,22,0.3)]"
    />
  );
};

export default AnimatedLogo;