"use client";

import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

const WealthFlowAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestIdRef = useRef<number>(0);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Animation properties
    let particles: Array<{
      x: number;
      y: number;
      radius: number;
      speed: number;
      angle: number;
      opacity: number;
      growRate: number;
    }> = [];
    
    const maxParticles = 30;
    let animationFrame = 0;
    
    // Colors based on theme
    const getParticleColor = () => {
      return theme === 'light' 
        ? ['rgba(37, 99, 235, 0.8)', 'rgba(29, 78, 216, 0.8)', 'rgba(59, 130, 246, 0.8)'] 
        : ['rgba(96, 165, 250, 0.8)', 'rgba(147, 197, 253, 0.8)', 'rgba(191, 219, 254, 0.8)'];
    };
    
    // Path points for the wealth flow cycle (circular path with 5 main points)
    const pathPoints = [
      { x: canvas.width * 0.5, y: canvas.height * 0.2 },  // Top center
      { x: canvas.width * 0.8, y: canvas.height * 0.4 },  // Top right
      { x: canvas.width * 0.7, y: canvas.height * 0.8 },  // Bottom right
      { x: canvas.width * 0.3, y: canvas.height * 0.8 },  // Bottom left
      { x: canvas.width * 0.2, y: canvas.height * 0.4 },  // Top left
    ];
    
    // Labels for the 5 points in the wealth cycle
    const labels = [
      "Investment", 
      "Appreciation", 
      "Equity Growth", 
      "Cash Flow", 
      "Reinvestment"
    ];
    
    // Create particle at a position
    const createParticle = (startPointIndex: number) => {
      const startPoint = pathPoints[startPointIndex];
      const nextPointIndex = (startPointIndex + 1) % pathPoints.length;
      const nextPoint = pathPoints[nextPointIndex];
      
      // Calculate angle toward next point
      const angle = Math.atan2(nextPoint.y - startPoint.y, nextPoint.x - startPoint.x);
      
      const colors = getParticleColor();
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      return {
        x: startPoint.x,
        y: startPoint.y,
        radius: 4 + Math.random() * 4,
        speed: 0.5 + Math.random() * 1.5,
        angle: angle,
        opacity: 0.1 + Math.random() * 0.4,
        growRate: 0.01 + Math.random() * 0.02,
        color
      };
    };
    
    // Draw a single particle
    const drawParticle = (particle: any) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particle.color.replace('0.8', particle.opacity.toString());
      ctx.fill();
    };
    
    // Draw the connectors between points (the cycle)
    const drawConnectors = () => {
      ctx.beginPath();
      ctx.moveTo(pathPoints[0].x, pathPoints[0].y);
      
      for (let i = 1; i <= pathPoints.length; i++) {
        const point = pathPoints[i % pathPoints.length];
        ctx.lineTo(point.x, point.y);
      }
      
      ctx.strokeStyle = theme === 'light' ? 'rgba(37, 99, 235, 0.3)' : 'rgba(147, 197, 253, 0.3)';
      ctx.lineWidth = 2;
      ctx.stroke();
    };
    
    // Draw labels at each point
    const drawLabels = () => {
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = theme === 'light' ? '#1e40af' : '#93c5fd';
      
      pathPoints.forEach((point, index) => {
        let offsetX = 0;
        let offsetY = -25; // Default position above point
        
        // Adjust label position based on location
        if (index === 1) { offsetX = 20; offsetY = -10; } // Top right
        if (index === 2) { offsetY = 25; } // Bottom right
        if (index === 3) { offsetY = 25; } // Bottom left
        if (index === 4) { offsetX = -20; offsetY = -10; } // Top left
        
        ctx.fillText(labels[index], point.x + offsetX, point.y + offsetY);
      });
    };
    
    // Draw node points 
    const drawNodes = () => {
      pathPoints.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = theme === 'light' ? '#1e40af' : '#60a5fa';
        ctx.fill();
        
        // Outer ring
        ctx.beginPath();
        ctx.arc(point.x, point.y, 10, 0, Math.PI * 2);
        ctx.strokeStyle = theme === 'light' ? '#1e40af' : '#60a5fa';
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    };
    
    // Update particle position and properties
    const updateParticle = (particle: any) => {
      // Move particle along its angle
      particle.x += Math.cos(particle.angle) * particle.speed;
      particle.y += Math.sin(particle.angle) * particle.speed;
      
      // Check if particle reaches next point
      for (let i = 0; i < pathPoints.length; i++) {
        const nextPoint = pathPoints[(i + 1) % pathPoints.length];
        const dist = Math.hypot(particle.x - nextPoint.x, particle.y - nextPoint.y);
        
        if (dist < 15) {
          // Redirect to the next point in the path
          const nextNextPoint = pathPoints[(i + 2) % pathPoints.length];
          particle.angle = Math.atan2(
            nextNextPoint.y - nextPoint.y,
            nextNextPoint.x - nextPoint.x
          );
          break;
        }
      }
      
      // Fade in and out based on position in lifecycle
      if (animationFrame % 60 < 30) {
        particle.opacity = Math.min(0.9, particle.opacity + particle.growRate);
      } else {
        particle.opacity = Math.max(0.1, particle.opacity - particle.growRate);
      }
      
      return particle;
    };
    
    // Main animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connecting lines and nodes 
      drawConnectors();
      drawNodes();
      drawLabels();
      
      // Create new particles
      if (particles.length < maxParticles && animationFrame % 10 === 0) {
        // Create particles at random start points
        const randomPointIndex = Math.floor(Math.random() * pathPoints.length);
        particles.push(createParticle(randomPointIndex));
      }
      
      // Update and draw particles
      particles = particles
        .map(updateParticle)
        .filter(p => p.opacity > 0.05);
      
      particles.forEach(drawParticle);
      
      animationFrame++;
      requestIdRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    requestIdRef.current = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      cancelAnimationFrame(requestIdRef.current);
    };
  }, [theme]);
  
  return (
    <div className="relative w-full h-96 flex items-center justify-center rounded-lg overflow-hidden">
      <canvas 
        ref={canvasRef} 
        width={600} 
        height={400} 
        className="w-full h-full bg-transparent"
      />
    </div>
  );
};

export default WealthFlowAnimation; 