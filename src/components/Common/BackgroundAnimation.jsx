import React, { useEffect, useRef } from 'react';
import '../../styles/CommonStyle/_backgroundAnimation.scss';

const BackgroundAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Enhanced particle configuration
    const particleCount = 100;
    const connectionDistance = 180;
    const particles = [];
    const glowStrength = 20; // Controls the strength of the glow effect

    // Create particles with more sophisticated variations
    for (let i = 0; i < particleCount; i++) {
      const size = Math.random();
      const isLarge = size > 0.85; // 15% chance of being large
      const isMedium = size > 0.6 && size <= 0.85; // 25% chance of being medium
      const isHollow = Math.random() < 0.45; // 45% chance of being hollow
      
      const baseRadius = isLarge ? 4.5 : (isMedium ? 3 : 1.8);
      const orbitRadius = Math.random() * 50; // Radius of orbital motion
      const orbitSpeed = (Math.random() * 0.002) + 0.001; // Speed of orbital motion
      const startAngle = Math.random() * Math.PI * 2; // Starting position in orbit

      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: baseRadius + Math.random() * (isLarge ? 2 : 0.7),
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: (Math.random() - 0.5) * 0.15,
        isLarge,
        isMedium,
        isHollow,
        hasRing: (isLarge || isMedium) && Math.random() < 0.7,
        hasGlow: Math.random() < 0.3, // 30% chance of having a glow effect
        pulseOffset: Math.random() * Math.PI * 2,
        pulseSpeed: 0.015 + Math.random() * 0.015,
        orbitRadius,
        orbitSpeed,
        orbitAngle: startAngle,
        baseX: 0, // Will be set in first update
        baseY: 0, // Will be set in first update
        opacity: 0, // Start invisible for fade-in effect
        targetOpacity: isLarge ? 0.9 : (isMedium ? 0.7 : 0.5)
      });
    }

    // Initialize base positions
    particles.forEach(particle => {
      particle.baseX = particle.x;
      particle.baseY = particle.y;
    });

    function drawNetwork() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections with enhanced styling
      ctx.shadowBlur = 0; // Reset shadow for connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.12;
            const gradient = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );
            
            gradient.addColorStop(0, `rgba(255, 189, 0, ${opacity * particles[i].opacity})`);
            gradient.addColorStop(1, `rgba(255, 189, 0, ${opacity * particles[j].opacity})`);
            
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      const time = Date.now() * 0.001;

      // Draw particles with enhanced effects
      particles.forEach(particle => {
        // Smooth opacity transition
        particle.opacity += (particle.targetOpacity - particle.opacity) * 0.02;

        // Update orbital position
        particle.orbitAngle += particle.orbitSpeed;
        particle.x = particle.baseX + Math.cos(particle.orbitAngle) * particle.orbitRadius;
        particle.y = particle.baseY + Math.sin(particle.orbitAngle) * particle.orbitRadius;

        // Calculate pulse effect
        const pulse = Math.sin(time * particle.pulseSpeed + particle.pulseOffset) * 0.3;
        const currentRadius = particle.radius * (1 + (particle.isLarge ? pulse * 0.25 : pulse * 0.15));

        // Apply glow effect
        if (particle.hasGlow) {
          ctx.shadowColor = 'rgba(255, 189, 0, 0.5)';
          ctx.shadowBlur = glowStrength * particle.opacity;
        } else {
          ctx.shadowBlur = 0;
        }

        // Draw main particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, currentRadius, 0, Math.PI * 2);
        
        if (particle.isHollow) {
          ctx.strokeStyle = `rgba(255, 189, 0, ${particle.opacity})`;
          ctx.lineWidth = particle.isLarge ? 1.8 : particle.isMedium ? 1.2 : 0.7;
          ctx.stroke();
        } else {
          ctx.fillStyle = `rgba(255, 189, 0, ${particle.opacity})`;
          ctx.fill();
        }

        // Draw ring with enhanced effect
        if (particle.hasRing) {
          const ringPulse = Math.sin(time * particle.pulseSpeed * 0.7 + particle.pulseOffset) * 0.5;
          const ringRadius = currentRadius + 2 + ringPulse;
          
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, ringRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 189, 0, ${0.2 * particle.opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }

        // Update base position for orbital motion
        particle.baseX += particle.speedX;
        particle.baseY += particle.speedY;

        // Bounce off walls
        if (particle.baseX < 0 || particle.baseX > canvas.width) {
          particle.speedX *= -1;
          particle.baseX = Math.max(0, Math.min(canvas.width, particle.baseX));
        }
        if (particle.baseY < 0 || particle.baseY > canvas.height) {
          particle.speedY *= -1;
          particle.baseY = Math.max(0, Math.min(canvas.height, particle.baseY));
        }
      });
    }

    function animate() {
      drawNetwork();
      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, []);

  return <canvas ref={canvasRef} id="networkCanvas" />;
};

export default BackgroundAnimation;
