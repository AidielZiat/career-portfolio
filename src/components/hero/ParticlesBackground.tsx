import { useEffect, useRef } from 'react';

const ParticlesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const particles: HTMLDivElement[] = [];
    const particlesContainer = document.querySelector('.particles-container');

    if (!particlesContainer) return;

    for (let i = 0; i < 40; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');

      const size = Math.random() * 4 + 1;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 30}s`;
      particle.style.animationDuration = `${Math.random() * 15 + 15}s`;

      const hue = Math.random() * 20 + 213;
      const saturation = Math.random() * 30 + 70;
      const lightness = Math.random() * 30 + 50;
      particle.style.backgroundColor = `hsla(${hue}, ${saturation}%, ${lightness}%, ${Math.random() * 0.4 + 0.15})`;

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

    for (let i = 0; i < 60; i++) {
      points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
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
            ctx.strokeStyle = `rgba(37, 99, 235, ${opacity * 0.15})`;
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
        gradient.addColorStop(0, 'rgba(37, 99, 235, 0.25)');
        gradient.addColorStop(1, 'rgba(37, 99, 235, 0)');

        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(37, 99, 235, 0.6)';
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
    <div className="absolute inset-0 opacity-40 dark:opacity-70 pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <div className="particles-container" />
    </div>
  );
};

export default ParticlesBackground;