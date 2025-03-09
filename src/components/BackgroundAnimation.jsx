import React, { useEffect, useRef } from 'react';

const BackgroundAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const fixedWidth = 1920;
    const fixedHeight = 1080;
    canvas.width = fixedWidth;
    canvas.height = fixedHeight;

    let particles = [];
    let colorShift = 0;

    // 150 ta particle create korchi
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * fixedWidth,
        y: Math.random() * fixedHeight,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        radius: Math.random() * 3 + 1,
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.05,
        trail: [],
      });
    }

    function getVibrantColor() {
      const r = Math.floor(Math.sin(colorShift) * 127 + 128);
      const g = Math.floor(Math.sin(colorShift + Math.PI / 2) * 127 + 128);
      const b = Math.floor(Math.sin(colorShift + Math.PI) * 127 + 128);
      return `rgb(${r}, ${g}, ${b})`;
    }

    function drawNetwork() {
      ctx.clearRect(0, 0, fixedWidth, fixedHeight);
      colorShift += 0.02;

      for (let p of particles) {
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 10) {
          p.trail.shift();
        }

        // Particle er trail draw kora
        for (let i = 0; i < p.trail.length; i++) {
          const alpha = (i + 1) / p.trail.length;
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.beginPath();
          ctx.arc(p.trail[i].x, p.trail[i].y, p.radius * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Particle draw kora
        ctx.fillStyle = getVibrantColor();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Particle er position update kora
        p.x += p.speedX;
        p.y += p.speedY;
        p.angle += p.angularSpeed;
        p.x += Math.sin(p.angle) * 0.5;
        p.y += Math.cos(p.angle) * 0.5;

        if (p.x < 0 || p.x > fixedWidth) p.speedX *= -1;
        if (p.y < 0 || p.y > fixedHeight) p.speedY *= -1;

        // Particles gulor majhe line draw kora jodi durutto kom hoy
        for (let q of particles) {
          const distance = Math.sqrt(Math.pow(p.x - q.x, 2) + Math.pow(p.y - q.y, 2));
          if (distance < 150) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 150})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(drawNetwork);
    }

    drawNetwork();

    // Cleanup function: jodi component unmount hoy tokhon
 
  }, []);

  return <canvas ref={canvasRef} id="networkCanvas"></canvas>;
};

export default BackgroundAnimation;
