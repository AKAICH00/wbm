"use client";

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';

// Line material for pencil sketch effect
const lineMaterial = new THREE.LineBasicMaterial({
  color: '#000000',
  linewidth: 1, // Note: linewidth may not work in WebGL, we'll use thin lines by default
  opacity: 0.8,
  transparent: true
});

// Animation stages of house construction
const TOTAL_STAGES = 7;

// Define types for beam props
interface BeamProps {
  corners: [number, number, number][];
  delay?: number;
  stage: number;
  currentStage: number;
}

// Each beam of the house frame as a line frame
function BeamOutline({ corners, delay = 0, stage, currentStage }: BeamProps) {
  // React Three Fiber uses any for refs to three.js objects
  const groupRef = useRef<any>(null);
  const [visible, setVisible] = useState(false);
  
  // Create edges from the corners of the beam
  const edges = useMemo(() => {
    // Create a geometry with vertices at each corner
    const points = [];
    
    // Front face (clockwise from bottom-left)
    points.push(new THREE.Vector3(corners[0][0], corners[0][1], corners[0][2]));
    points.push(new THREE.Vector3(corners[1][0], corners[1][1], corners[1][2]));
    points.push(new THREE.Vector3(corners[2][0], corners[2][1], corners[2][2]));
    points.push(new THREE.Vector3(corners[3][0], corners[3][1], corners[3][2]));
    points.push(new THREE.Vector3(corners[0][0], corners[0][1], corners[0][2]));
    
    // Back face (clockwise from bottom-left)
    points.push(new THREE.Vector3(corners[4][0], corners[4][1], corners[4][2]));
    points.push(new THREE.Vector3(corners[5][0], corners[5][1], corners[5][2]));
    points.push(new THREE.Vector3(corners[6][0], corners[6][1], corners[6][2]));
    points.push(new THREE.Vector3(corners[7][0], corners[7][1], corners[7][2]));
    points.push(new THREE.Vector3(corners[4][0], corners[4][1], corners[4][2]));
    
    // Connect front to back
    const connectingLines = [];
    connectingLines.push(new THREE.Vector3(corners[0][0], corners[0][1], corners[0][2]));
    connectingLines.push(new THREE.Vector3(corners[4][0], corners[4][1], corners[4][2]));
    
    connectingLines.push(new THREE.Vector3(corners[1][0], corners[1][1], corners[1][2]));
    connectingLines.push(new THREE.Vector3(corners[5][0], corners[5][1], corners[5][2]));
    
    connectingLines.push(new THREE.Vector3(corners[2][0], corners[2][1], corners[2][2]));
    connectingLines.push(new THREE.Vector3(corners[6][0], corners[6][1], corners[6][2]));
    
    connectingLines.push(new THREE.Vector3(corners[3][0], corners[3][1], corners[3][2]));
    connectingLines.push(new THREE.Vector3(corners[7][0], corners[7][1], corners[7][2]));
    
    // Create a BufferGeometry from the points
    const geometry = new THREE.BufferGeometry().setFromPoints([...points, ...connectingLines]);
    
    return geometry;
  }, [corners]);
  
  // Make the line visible when its stage is reached
  useEffect(() => {
    if (currentStage >= stage) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, delay * 300); // Delay for stop-motion effect
      return () => clearTimeout(timer);
    }
  }, [currentStage, stage, delay]);

  return (
    <group ref={groupRef} visible={visible}>
      <lineSegments geometry={edges}>
        <primitive object={lineMaterial} attach="material" />
      </lineSegments>
    </group>
  );
}

// Helper function to calculate corners of a beam based on center position and size
function calculateBeamCorners(position: [number, number, number], size: [number, number, number]): [number, number, number][] {
  const [x, y, z] = position;
  const [width, height, depth] = size;
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const halfDepth = depth / 2;

  // Generate 8 corners of the beam (a 3D box)
  return [
    // Front face - bottom left, bottom right, top right, top left
    [x - halfWidth, y - halfHeight, z + halfDepth],
    [x + halfWidth, y - halfHeight, z + halfDepth],
    [x + halfWidth, y + halfHeight, z + halfDepth],
    [x - halfWidth, y + halfHeight, z + halfDepth],
    
    // Back face - bottom left, bottom right, top right, top left
    [x - halfWidth, y - halfHeight, z - halfDepth],
    [x + halfWidth, y - halfHeight, z - halfDepth],
    [x + halfWidth, y + halfHeight, z - halfDepth],
    [x - halfWidth, y + halfHeight, z - halfDepth]
  ];
}

// Main house frame component
function HouseFrame({ currentStage }: { currentStage: number }) {
  return (
    <group>
      {/* Foundation */}
      <BeamOutline 
        corners={calculateBeamCorners([0, -0.6, 0], [8, 0.2, 8])} 
        stage={0} 
        currentStage={currentStage} 
      />
      
      {/* Floor frame */}
      <BeamOutline 
        corners={calculateBeamCorners([0, -0.3, 0], [7.5, 0.4, 7.5])} 
        stage={1} 
        currentStage={currentStage} 
      />
      
      {/* Corner posts - front left, front right, back left, back right */}
      <BeamOutline 
        corners={calculateBeamCorners([-3.5, 1.5, 3.5], [0.4, 4, 0.4])} 
        stage={2} 
        currentStage={currentStage} 
        delay={1} 
      />
      <BeamOutline 
        corners={calculateBeamCorners([3.5, 1.5, 3.5], [0.4, 4, 0.4])} 
        stage={2} 
        currentStage={currentStage} 
        delay={2} 
      />
      <BeamOutline 
        corners={calculateBeamCorners([-3.5, 1.5, -3.5], [0.4, 4, 0.4])} 
        stage={2} 
        currentStage={currentStage} 
        delay={3} 
      />
      <BeamOutline 
        corners={calculateBeamCorners([3.5, 1.5, -3.5], [0.4, 4, 0.4])} 
        stage={2} 
        currentStage={currentStage} 
        delay={4} 
      />
      
      {/* Bottom horizontal frame - front, right, back, left */}
      <BeamOutline 
        corners={calculateBeamCorners([0, 0, 3.5], [7.4, 0.4, 0.4])} 
        stage={3} 
        currentStage={currentStage} 
        delay={1} 
      />
      <BeamOutline 
        corners={calculateBeamCorners([3.5, 0, 0], [0.4, 0.4, 7.4])} 
        stage={3} 
        currentStage={currentStage} 
        delay={2} 
      />
      <BeamOutline 
        corners={calculateBeamCorners([0, 0, -3.5], [7.4, 0.4, 0.4])} 
        stage={3} 
        currentStage={currentStage} 
        delay={3} 
      />
      <BeamOutline 
        corners={calculateBeamCorners([-3.5, 0, 0], [0.4, 0.4, 7.4])} 
        stage={3} 
        currentStage={currentStage} 
        delay={4} 
      />
      
      {/* Top horizontal frame - front, right, back, left */}
      <BeamOutline 
        corners={calculateBeamCorners([0, 3.5, 3.5], [7.4, 0.4, 0.4])} 
        stage={4} 
        currentStage={currentStage} 
        delay={1} 
      />
      <BeamOutline 
        corners={calculateBeamCorners([3.5, 3.5, 0], [0.4, 0.4, 7.4])} 
        stage={4} 
        currentStage={currentStage} 
        delay={2} 
      />
      <BeamOutline 
        corners={calculateBeamCorners([0, 3.5, -3.5], [7.4, 0.4, 0.4])} 
        stage={4} 
        currentStage={currentStage} 
        delay={3} 
      />
      <BeamOutline 
        corners={calculateBeamCorners([-3.5, 3.5, 0], [0.4, 0.4, 7.4])} 
        stage={4} 
        currentStage={currentStage} 
        delay={4} 
      />
      
      {/* Roof support beams */}
      <BeamOutline 
        corners={calculateBeamCorners([-3.5, 4, 0], [0.4, 5.5, 0.4])} 
        stage={5} 
        currentStage={currentStage} 
        delay={1} 
      />
      <BeamOutline 
        corners={calculateBeamCorners([3.5, 4, 0], [0.4, 5.5, 0.4])} 
        stage={5} 
        currentStage={currentStage} 
        delay={2} 
      />
      <BeamOutline 
        corners={calculateBeamCorners([0, 4, 3.5], [0.4, 5.5, 0.4])} 
        stage={5} 
        currentStage={currentStage} 
        delay={3} 
      />
      <BeamOutline 
        corners={calculateBeamCorners([0, 4, -3.5], [0.4, 5.5, 0.4])} 
        stage={5} 
        currentStage={currentStage} 
        delay={4} 
      />
      
      {/* Roof peak */}
      <BeamOutline 
        corners={calculateBeamCorners([0, 6, 0], [0.4, 0.4, 8])} 
        stage={6} 
        currentStage={currentStage} 
        delay={1} 
      />
      <BeamOutline 
        corners={calculateBeamCorners([0, 6, 0], [8, 0.4, 0.4])} 
        stage={6} 
        currentStage={currentStage} 
        delay={2} 
      />
      
      {/* Additional wall supports */}
      <BeamOutline 
        corners={calculateBeamCorners([0, 1.5, 3.5], [3, 3, 0.3])} 
        stage={6} 
        currentStage={currentStage} 
        delay={3} 
      />
      <BeamOutline 
        corners={calculateBeamCorners([-1.5, 1.5, 0], [0.3, 3, 3])} 
        stage={6} 
        currentStage={currentStage} 
        delay={4} 
      />
      <BeamOutline 
        corners={calculateBeamCorners([1.5, 1.5, 0], [0.3, 3, 3])} 
        stage={6} 
        currentStage={currentStage} 
        delay={5} 
      />
    </group>
  );
}

// Scene component with animation logic
function Scene() {
  const [stage, setStage] = useState(0);
  const controlsRef = useRef<OrbitControlsImpl>(null);
  
  // Progress through construction stages
  useEffect(() => {
    if (stage < TOTAL_STAGES) {
      const timer = setTimeout(() => {
        setStage(prev => prev + 1);
      }, 3000); // 3 seconds per stage
      return () => clearTimeout(timer);
    }
  }, [stage]);
  
  // Reset animation after completion
  useEffect(() => {
    if (stage === TOTAL_STAGES) {
      const timer = setTimeout(() => {
        setStage(0);
      }, 5000); // Pause at complete house before restarting
      return () => clearTimeout(timer);
    }
  }, [stage]);

  return (
    <>
      {/* Fixed camera position for a static view */}
      <PerspectiveCamera makeDefault position={[10, 8, 10]} />
      <OrbitControls 
        ref={controlsRef}
        enableRotate={false}  // Disable rotation
        enableZoom={false}
        enablePan={false}
      />
      <ambientLight intensity={1.0} /> {/* Brighter light to see lines clearly */}
      <HouseFrame currentStage={stage} />
    </>
  );
}

// Main export component
export default function HouseAnimation() {
  return (
    <div className="w-full h-full">
      <Canvas 
        shadows={false}  // No shadows needed for wireframe
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
} 