"use client";

import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

const TaxSavingsAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestIdRef = useRef<number>(0);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Animation variables
    let animationFrame = 0;
    const barHeight = canvas.height * 0.7;
    const barWidth = 60;
    const startX = canvas.width * 0.2;
    const endX = canvas.width * 0.8;
    const startY = canvas.height - 50;
    
    // Bar data
    const bars = [
      { x: startX, label: 'Income', value: 100, color: '#3b82f6' },
      { x: startX + (endX - startX) * 0.25, label: 'Tax Deductions', value: 70, color: '#10b981' },
      { x: startX + (endX - startX) * 0.5, label: 'Depreciation', value: 55, color: '#8b5cf6' },
      { x: startX + (endX - startX) * 0.75, label: '1031 Exchange', value: 30, color: '#f59e0b' },
      { x: endX, label: 'Net Tax', value: 15, color: '#ef4444' }
    ];
    
    // Animation properties for flowing money particles
    const particles: Array<{
      x: number,
      y: number,
      size: number,
      speed: number,
      opacity: number,
      fromBarIndex: number,
      toBarIndex: number,
      progress: number
    }> = [];
    
    // Create particle flowing from one bar to another
    const createParticle = (fromIndex: number, toIndex: number) => {
      const fromBar = bars[fromIndex];
      const toBar = bars[toIndex];
      const progress = 0;
      
      return {
        x: fromBar.x,
        y: startY - fromBar.value * (barHeight / 100),
        size: 3 + Math.random() * 4,
        speed: 0.5 + Math.random() * 1,
        opacity: 0.5 + Math.random() * 0.5,
        fromBarIndex: fromIndex,
        toBarIndex: toIndex,
        progress
      };
    };
    
    // Draw a single bar with animation
    const drawBar = (bar: any, progress: number) => {
      const currentHeight = bar.value * (barHeight / 100) * progress;
      const xPos = bar.x - barWidth / 2;
      
      // Draw the bar
      ctx.fillStyle = bar.color;
      ctx.fillRect(xPos, startY - currentHeight, barWidth, currentHeight);
      
      // Draw stroke
      ctx.strokeStyle = theme === 'light' ? '#1e3a8a' : '#e0f2fe';
      ctx.lineWidth = 2;
      ctx.strokeRect(xPos, startY - currentHeight, barWidth, currentHeight);
      
      // Draw value at top if bar is fully visible
      if (progress > 0.9) {
        ctx.fillStyle = theme === 'light' ? '#1e3a8a' : '#e0f2fe';
        ctx.font = 'bold 16px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`${bar.value}%`, bar.x, startY - currentHeight - 10);
      }
      
      // Draw label at bottom
      ctx.fillStyle = theme === 'light' ? '#334155' : '#e0f2fe';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(bar.label, bar.x, startY + 20);
    };
    
    // Draw connecting arrows between bars
    const drawConnectors = (progress: number) => {
      // Only draw connectors when bars are mostly drawn
      if (progress < 0.7) return;
      
      ctx.strokeStyle = theme === 'light' ? 'rgba(37, 99, 235, 0.6)' : 'rgba(147, 197, 253, 0.6)';
      ctx.lineWidth = 2;
      
      // Draw arrows between consecutive bars
      for (let i = 0; i < bars.length - 1; i++) {
        const fromBar = bars[i];
        const toBar = bars[i + 1];
        const fromHeight = fromBar.value * (barHeight / 100);
        const toHeight = toBar.value * (barHeight / 100);
        const fromX = fromBar.x + barWidth / 2;
        const fromY = startY - fromHeight + fromHeight / 2;
        const toX = toBar.x - barWidth / 2;
        const toY = startY - toHeight + toHeight / 2;
        
        // Draw connecting line
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.stroke();
        
        // Draw arrow head
        const angle = Math.atan2(toY - fromY, toX - fromX);
        const arrowSize = 10;
        
        ctx.beginPath();
        ctx.moveTo(toX, toY);
        ctx.lineTo(
          toX - arrowSize * Math.cos(angle - Math.PI / 6),
          toY - arrowSize * Math.sin(angle - Math.PI / 6)
        );
        ctx.lineTo(
          toX - arrowSize * Math.cos(angle + Math.PI / 6),
          toY - arrowSize * Math.sin(angle + Math.PI / 6)
        );
        ctx.closePath();
        ctx.fillStyle = theme === 'light' ? 'rgba(37, 99, 235, 0.8)' : 'rgba(147, 197, 253, 0.8)';
        ctx.fill();
      }
    };
    
    // Update and draw particles
    const updateParticles = () => {
      // Occasionally create new particles
      if (animationFrame % 40 === 0) {
        for (let i = 0; i < bars.length - 1; i++) {
          // Create a particle flowing from one bar to the next
          particles.push(createParticle(i, i + 1));
        }
      }
      
      // Update existing particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const fromBar = bars[p.fromBarIndex];
        const toBar = bars[p.toBarIndex];
        
        // Update progress
        p.progress += 0.01 * p.speed;
        
        // Calculate current position
        const fromX = fromBar.x + barWidth / 2;
        const fromY = startY - fromBar.value * (barHeight / 100) + fromBar.value * (barHeight / 100) / 2;
        const toX = toBar.x - barWidth / 2;
        const toY = startY - toBar.value * (barHeight / 100) + toBar.value * (barHeight / 100) / 2;
        
        // Use quadratic bezier curve for particle path
        const controlX = (fromX + toX) / 2;
        const controlY = Math.min(fromY, toY) - 30;
        
        // Calculate position on the bezier curve
        const t = p.progress;
        p.x = Math.pow(1 - t, 2) * fromX + 2 * (1 - t) * t * controlX + Math.pow(t, 2) * toX;
        p.y = Math.pow(1 - t, 2) * fromY + 2 * (1 - t) * t * controlY + Math.pow(t, 2) * toY;
        
        // Fade out as it reaches destination
        if (p.progress > 0.8) {
          p.opacity = 0.8 * (1 - (p.progress - 0.8) * 5); // Fade out in the last 20%
        }
        
        // Draw the dollar sign particle
        if (p.opacity > 0.1) {
          ctx.font = `${p.size}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.fillStyle = theme === 'light' 
            ? `rgba(16, 185, 129, ${p.opacity})` 
            : `rgba(74, 222, 128, ${p.opacity})`;
          ctx.fillText('$', p.x, p.y);
        }
      }
      
      // Remove particles that have completed their journey
      particles.filter(p => p.progress < 1);
    };
    
    // Main animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate animation progress (0 to 1 over 2 seconds)
      const progress = Math.min(1, animationFrame / 120);
      
      // Draw title
      ctx.fillStyle = theme === 'light' ? '#1e3a8a' : '#e0f2fe';
      ctx.font = 'bold 20px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Tax Optimization Flow', canvas.width / 2, 30);
      
      // Draw connecting lines
      drawConnectors(progress);
      
      // Draw each bar with current progress
      bars.forEach(bar => drawBar(bar, progress));
      
      // Once bars are drawn, animate particles
      if (progress >= 1) {
        updateParticles();
      }
      
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

export default TaxSavingsAnimation; 