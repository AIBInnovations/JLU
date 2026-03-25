'use client';

import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

interface Globe3DProps {
  size?: number;
}

export const Globe3D = ({ size = 300 }: Globe3DProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const previousMouse = useRef({ x: 0, y: 0 });
  const rotationVelocity = useRef({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !mountRef.current) return;

    const container = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 2.8;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const globe = new THREE.Group();
    scene.add(globe);

    // Main wireframe sphere - bright white
    const geometry = new THREE.SphereGeometry(1, 48, 48);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireframe = new THREE.Mesh(geometry, wireframeMaterial);
    globe.add(wireframe);

    // Solid inner sphere for depth
    const innerGeometry = new THREE.SphereGeometry(0.98, 48, 48);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.05,
    });
    const inner = new THREE.Mesh(innerGeometry, innerMaterial);
    globe.add(inner);

    // Latitude lines - white
    const latitudes = [-60, -30, 0, 30, 60];
    latitudes.forEach((lat) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const radius = Math.sin(phi) * 1.008;
      const y = Math.cos(phi) * 1.008;
      const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, 2 * Math.PI, false, 0);
      const points = curve.getPoints(128);
      const latGeometry = new THREE.BufferGeometry().setFromPoints(
        points.map(p => new THREE.Vector3(p.x, 0, p.y))
      );
      const latMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: lat === 0 ? 0.7 : 0.4,
      });
      const line = new THREE.Line(latGeometry, latMaterial);
      line.position.y = y;
      globe.add(line);
    });

    // Longitude lines - white
    for (let i = 0; i < 18; i++) {
      const curve = new THREE.EllipseCurve(0, 0, 1.008, 1.008, 0, 2 * Math.PI, false, 0);
      const points = curve.getPoints(128);
      const longGeometry = new THREE.BufferGeometry().setFromPoints(
        points.map(p => new THREE.Vector3(p.x, p.y, 0))
      );
      const longMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.25,
      });
      const line = new THREE.Line(longGeometry, longMaterial);
      line.rotation.y = (i / 18) * Math.PI;
      globe.add(line);
    }

    // Glowing dots - gold
    const dotPositions = [
      { lat: 23.2, lon: 77.4 },   // Bhopal
      { lat: 28.6, lon: 77.2 },   // Delhi
      { lat: 19.1, lon: 72.9 },   // Mumbai
      { lat: 51.5, lon: -0.1 },   // London
      { lat: 40.7, lon: -74 },    // New York
      { lat: 35.7, lon: 139.7 },  // Tokyo
      { lat: -33.9, lon: 151.2 }, // Sydney
      { lat: 1.35, lon: 103.8 },  // Singapore
      { lat: 48.9, lon: 2.35 },   // Paris
      { lat: 55.8, lon: 37.6 },   // Moscow
      { lat: 13.1, lon: 80.3 },   // Chennai
      { lat: 12.97, lon: 77.6 },  // Bangalore
    ];

    dotPositions.forEach((pos) => {
      const phi = (90 - pos.lat) * (Math.PI / 180);
      const theta = (pos.lon + 180) * (Math.PI / 180);
      const x = -1.02 * Math.sin(phi) * Math.cos(theta);
      const y = 1.02 * Math.cos(phi);
      const z = 1.02 * Math.sin(phi) * Math.sin(theta);

      const dotGeometry = new THREE.SphereGeometry(0.03, 12, 12);
      const dotMaterial = new THREE.MeshBasicMaterial({
        color: 0x3bd0eb,
        transparent: true,
        opacity: 1,
      });
      const dot = new THREE.Mesh(dotGeometry, dotMaterial);
      dot.position.set(x, y, z);
      globe.add(dot);

      // Glow around dot
      const glowDotGeometry = new THREE.SphereGeometry(0.06, 8, 8);
      const glowDotMaterial = new THREE.MeshBasicMaterial({
        color: 0x3bd0eb,
        transparent: true,
        opacity: 0.2,
      });
      const glowDot = new THREE.Mesh(glowDotGeometry, glowDotMaterial);
      glowDot.position.set(x, y, z);
      globe.add(glowDot);
    });

    // Make Bhopal dot bigger with extra glow
    const bhopalPhi = (90 - 23.2) * (Math.PI / 180);
    const bhopalTheta = (77.4 + 180) * (Math.PI / 180);
    const bx = -1.02 * Math.sin(bhopalPhi) * Math.cos(bhopalTheta);
    const by = 1.02 * Math.cos(bhopalPhi);
    const bz = 1.02 * Math.sin(bhopalPhi) * Math.sin(bhopalTheta);

    // Bigger Bhopal pulse glow
    const bhopalGlow1 = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0x3bd0eb, transparent: true, opacity: 0.15 })
    );
    bhopalGlow1.position.set(bx, by, bz);
    globe.add(bhopalGlow1);

    const bhopalGlow2 = new THREE.Mesh(
      new THREE.SphereGeometry(0.15, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0x3bd0eb, transparent: true, opacity: 0.06 })
    );
    bhopalGlow2.position.set(bx, by, bz);
    globe.add(bhopalGlow2);

    // (MP map removed)

    // Outer glow rings
    [1.06, 1.1, 1.15].forEach((r, i) => {
      const glowGeometry = new THREE.RingGeometry(r - 0.01, r + 0.01, 64);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.08 - i * 0.02,
        side: THREE.DoubleSide,
      });
      const glowRing = new THREE.Mesh(glowGeometry, glowMaterial);
      glowRing.lookAt(camera.position);
      scene.add(glowRing);
    });

    // Auto rotation
    let autoRotateSpeed = 0.004;

    // Mouse/touch drag
    const onPointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      previousMouse.current = { x: e.clientX, y: e.clientY };
      autoRotateSpeed = 0;
      container.style.cursor = 'grabbing';
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - previousMouse.current.x;
      const dy = e.clientY - previousMouse.current.y;
      rotationVelocity.current = { x: dy * 0.008, y: dx * 0.008 };
      globe.rotation.y += dx * 0.008;
      globe.rotation.x += dy * 0.008;
      previousMouse.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDragging.current = false;
      autoRotateSpeed = 0.004;
      container.style.cursor = 'grab';
    };

    container.addEventListener('pointerdown', onPointerDown);
    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerup', onPointerUp);
    container.addEventListener('pointerleave', onPointerUp);
    container.style.cursor = 'grab';

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (!isDragging.current) {
        globe.rotation.y += autoRotateSpeed;
        rotationVelocity.current.x *= 0.95;
        rotationVelocity.current.y *= 0.95;
        globe.rotation.x += rotationVelocity.current.x;
        globe.rotation.y += rotationVelocity.current.y;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      container.removeEventListener('pointerdown', onPointerDown);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerup', onPointerUp);
      container.removeEventListener('pointerleave', onPointerUp);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [mounted, size]);

  if (!mounted) return <div style={{ width: size, height: size }} />;

  return (
    <div
      ref={mountRef}
      style={{ width: size, height: size, touchAction: 'none' }}
    />
  );
};

export default Globe3D;
