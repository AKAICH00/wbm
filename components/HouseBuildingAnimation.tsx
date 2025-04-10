"use client";

import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

const HouseBuildingAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const requestIdRef = useRef<number>(0);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const audio = audioRef.current;
    
    if (!canvas || !audio) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set initial state
    let index = 0;
    const speed = 1; // Draw one line per frame
    let lastDrawTime = 0;
    const drawInterval = 120; // Minimum time between drawings in ms
    
    // Reset canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // House frame lines - a wooden frame house with beams
    const lines = [
      // Foundation
      { x1: 150, y1: 300, x2: 450, y2: 300 },
      
      // Left wall
      { x1: 150, y1: 300, x2: 150, y2: 150 },
      
      // Right wall
      { x1: 450, y1: 300, x2: 450, y2: 150 },
      
      // Roof lines
      { x1: 150, y1: 150, x2: 300, y2: 80 },
      { x1: 300, y1: 80, x2: 450, y2: 150 },
      
      // Floor beams
      { x1: 150, y1: 250, x2: 450, y2: 250 },
      
      // Vertical beams
      { x1: 200, y1: 300, x2: 200, y2: 150 },
      { x1: 250, y1: 300, x2: 250, y2: 150 },
      { x1: 300, y1: 300, x2: 300, y2: 150 },
      { x1: 350, y1: 300, x2: 350, y2: 150 },
      { x1: 400, y1: 300, x2: 400, y2: 150 },
      
      // Roof beams
      { x1: 200, y1: 150, x2: 300, y2: 100 },
      { x1: 250, y1: 150, x2: 300, y2: 110 },
      { x1: 350, y1: 150, x2: 300, y2: 110 },
      { x1: 400, y1: 150, x2: 300, y2: 100 },
      
      // Cross beams
      { x1: 150, y1: 200, x2: 450, y2: 200 },
      { x1: 150, y1: 170, x2: 450, y2: 170 },
      
      // Door frame
      { x1: 275, y1: 300, x2: 275, y2: 230 },
      { x1: 325, y1: 300, x2: 325, y2: 230 },
      { x1: 275, y1: 230, x2: 325, y2: 230 },
      
      // Window frames
      { x1: 175, y1: 220, x2: 225, y2: 220 },
      { x1: 175, y1: 190, x2: 225, y2: 190 },
      { x1: 175, y1: 220, x2: 175, y2: 190 },
      { x1: 225, y1: 220, x2: 225, y2: 190 },
      
      { x1: 375, y1: 220, x2: 425, y2: 220 },
      { x1: 375, y1: 190, x2: 425, y2: 190 },
      { x1: 375, y1: 220, x2: 375, y2: 190 },
      { x1: 425, y1: 220, x2: 425, y2: 190 },
    ];
    
    // Ensure we have enough steps for a smooth animation
    for (let i = 0; i < 15; i++) {
      // Small details like inner supports
      const x1 = 175 + Math.floor(i / 4) * 50;
      const y1 = 150 + (i % 4) * 30;
      lines.push({ x1, y1, x2: x1 + 20, y2: y1 });
    }
    
    // Drawing style
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Start playing the pencil sound
    audio.currentTime = 0;
    audio.loop = true;
    audio.volume = 0.3;
    
    const playAudio = () => {
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Audio play prevented by browser:", error);
        });
      }
    };
    
    // Function to draw a single line segment with sketch-like quality
    const drawLineSegment = (line: { x1: number, y1: number, x2: number, y2: number }) => {
      ctx.beginPath();
      ctx.moveTo(line.x1, line.y1);
      ctx.lineTo(line.x2, line.y2);
      // Use foreground color based on theme
      ctx.strokeStyle = theme === 'light' ? "#000000" : "#ffffff";
      ctx.lineWidth = 1 + Math.random() * 0.5;
      ctx.globalAlpha = 0.7 + Math.random() * 0.3;
      ctx.stroke();
    };
    
    // Animation function with time-based drawing
    const animateSketch = (timestamp: number) => {
      // Only draw if enough time has passed
      if (timestamp - lastDrawTime >= drawInterval && index < lines.length) {
        for (let i = 0; i < speed && index < lines.length; i++, index++) {
          drawLineSegment(lines[index]);
        }
        lastDrawTime = timestamp;
      }
      
      if (index < lines.length) {
        requestIdRef.current = requestAnimationFrame(animateSketch);
      } else {
        // Animation complete - show completion for a moment
        audio.pause();
        
        // Restart animation after a delay
        setTimeout(() => {
          index = 0;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          playAudio();
          lastDrawTime = 0;
          requestIdRef.current = requestAnimationFrame(animateSketch);
        }, 4000); // Pause at the end
      }
    };
    
    // Try to play the sound and start animation
    playAudio();
    requestIdRef.current = requestAnimationFrame(animateSketch);
    
    // Cleanup function
    return () => {
      audio.pause();
      cancelAnimationFrame(requestIdRef.current);
    };
  }, [theme]); // Re-run effect when theme changes
  
  return (
    <div className="relative w-full h-full flex items-center justify-center rounded-lg overflow-hidden">
      <canvas 
        ref={canvasRef} 
        width={600} 
        height={400} 
        className="w-full h-full bg-transparent"
      />
      <audio 
        ref={audioRef} 
        src="https://cdn.pixabay.com/download/audio/2021/09/01/audio_9a49cb3d87.mp3?filename=pencil-drawing-6893.mp3" 
        preload="auto"
      />
    </div>
  );
};

export default HouseBuildingAnimation; 