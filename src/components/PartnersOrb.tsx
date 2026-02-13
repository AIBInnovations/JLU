'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface Partner {
  name: string;
  shortName?: string;
  image?: string; // local image path if available
  type: 'university' | 'industry' | 'association';
}

const partners: Partner[] = [
  // Universities with local logos
  { name: 'Middlesex University', image: '/mid.png', type: 'university' },
  { name: "King's College London", image: '/king.png', type: 'university' },
  { name: 'National University of Singapore', shortName: 'NUS', image: '/nus.png', type: 'university' },

  // Industry with local logos
  { name: 'Confederation of Indian Industry', shortName: 'CII', image: '/c11.png', type: 'industry' },
  { name: 'FICCI', image: '/ficci.png', type: 'industry' },
  { name: 'Grant Thornton', image: '/gt.png', type: 'industry' },
  { name: 'ERA Foundation', shortName: 'ERA', image: '/era.png', type: 'association' },

  // International Universities (text cards)
  { name: 'University of Cambridge', type: 'university' },
  { name: 'University College London', shortName: 'UCL', type: 'university' },
  { name: 'Imperial College London', type: 'university' },
  { name: 'University of Lincoln', type: 'university' },
  { name: 'University of Arts London', shortName: 'UAL', type: 'university' },
  { name: 'Kingston University London', type: 'university' },
  { name: 'SOAS University of London', type: 'university' },
  { name: 'University of Sussex', type: 'university' },
  { name: 'Birmingham City University', type: 'university' },
  { name: 'Sheffield Hallam University', type: 'university' },
  { name: 'RMIT University', type: 'university' },
  { name: 'Purdue University', type: 'university' },
  { name: 'University of West Los Angeles', type: 'university' },
  { name: 'Vancouver Film School', shortName: 'VFS', type: 'university' },
  { name: 'HTWG Konstanz', type: 'university' },
  { name: 'Synergy University', type: 'university' },
  { name: 'Universidad Camilo José Cela', type: 'university' },
  { name: 'Woosong University', type: 'university' },
  { name: 'Korean National University of Arts', type: 'university' },
  { name: 'Guizhou University', type: 'university' },
  { name: 'Cape Breton University', type: 'university' },
  { name: 'MDIS Singapore', type: 'university' },

  // Industry & Professional Partners (text cards)
  { name: 'Ernst & Young', shortName: 'EY', type: 'industry' },
  { name: 'KPMG', type: 'industry' },
  { name: 'Harvard Business Publishing', type: 'industry' },
  { name: 'CIMA', type: 'industry' },
  { name: 'ACCA', type: 'industry' },
  { name: 'Wizcraft', type: 'industry' },
  { name: 'Wadhwani Foundation', type: 'industry' },
  { name: 'National Stock Exchange', shortName: 'NSE', type: 'industry' },
  { name: 'Enhelion', type: 'industry' },
  { name: 'Simplilearn', type: 'industry' },
  { name: 'Taxmann', type: 'industry' },
  { name: 'Siemens PLM', type: 'industry' },
  { name: 'Miles Education', type: 'industry' },
  { name: 'DesignTech', type: 'industry' },
  { name: 'Data Leads', type: 'industry' },

  // Associations
  { name: 'AUAP', type: 'association' },
  { name: 'Erasmus+', type: 'association' },
  { name: 'WFUNA', type: 'association' },
  { name: 'Association of Commonwealth Universities', shortName: 'ACU', type: 'association' },
];

interface PartnersOrbProps {
  isOpen: boolean;
  onClose: () => void;
}

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function easeInExpo(t: number) {
  return t === 0 ? 0 : Math.pow(2, 10 * t - 10);
}

interface CardData {
  mesh: THREE.Mesh;
  geometry: THREE.PlaneGeometry;
  material: THREE.MeshBasicMaterial;
  texture: THREE.Texture;
  targetPos: THREE.Vector3;
  targetLookAt: THREE.Vector3;
  delay: number;
}

const typeColors: Record<string, { bg: string; accent: string; text: string }> = {
  university: { bg: '#f0f7ff', accent: '#1a5276', text: '#1a3c5e' },
  industry: { bg: '#f0fff4', accent: '#03463B', text: '#1a3c2e' },
  association: { bg: '#fff8f0', accent: '#b8860b', text: '#5a3e1b' },
};

function createTextCard(partner: Partner): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 320;
  const ctx = canvas.getContext('2d')!;

  const colors = typeColors[partner.type];

  // Background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 512, 320);

  // Subtle top accent bar
  ctx.fillStyle = colors.accent;
  ctx.fillRect(0, 0, 512, 5);

  // Partner name
  const displayName = partner.shortName || partner.name;
  const isShort = displayName.length <= 6;

  ctx.fillStyle = colors.text;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  if (isShort) {
    ctx.font = 'bold 64px Inter, Arial, sans-serif';
    ctx.fillText(displayName, 256, 145);
  } else if (displayName.length <= 20) {
    ctx.font = 'bold 36px Inter, Arial, sans-serif';
    ctx.fillText(displayName, 256, 145);
  } else {
    // Word wrap for long names
    ctx.font = 'bold 28px Inter, Arial, sans-serif';
    const words = displayName.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      if (ctx.measureText(testLine).width > 440) {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);

    const lineHeight = 36;
    const startY = 145 - ((lines.length - 1) * lineHeight) / 2;
    lines.forEach((line, i) => {
      ctx.fillText(line, 256, startY + i * lineHeight);
    });
  }

  // Type label at bottom
  ctx.fillStyle = colors.accent + '80';
  ctx.font = '16px Inter, Arial, sans-serif';
  ctx.textAlign = 'center';
  const typeLabel = partner.type === 'university' ? 'UNIVERSITY' : partner.type === 'industry' ? 'INDUSTRY PARTNER' : 'ASSOCIATION';
  ctx.fillText(typeLabel, 256, 280);

  return canvas;
}

const PartnersOrb = ({ isOpen, onClose }: PartnersOrbProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const closeStartRef = useRef<number>(0);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      closeStartRef.current = 0;
      const timer = setTimeout(() => setIsReady(true), 50);
      return () => clearTimeout(timer);
    } else {
      setIsReady(false);
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (closeStartRef.current > 0) return;
    closeStartRef.current = performance.now();

    setTimeout(() => {
      if (overlayRef.current) {
        overlayRef.current.style.transition = 'opacity 0.4s ease';
        overlayRef.current.style.opacity = '0';
      }
    }, 800);

    setTimeout(() => {
      setVisible(false);
      closeStartRef.current = 0;
      onClose();
    }, 1200);
  }, [onClose]);

  useEffect(() => {
    if (!isReady || !containerRef.current || !visible) return;
    if (rendererRef.current) return;

    let mounted = true;
    let animationId: number | null = null;
    const cards: CardData[] = [];

    const totalItems = partners.length;
    const sphereRadius = 5;
    const baseWidth = 1.2;
    const baseHeight = 0.8;
    const entranceDuration = 2.0;
    const staggerTotal = 1.2;

    const scene = new THREE.Scene();
    const orbGroup = new THREE.Group();
    orbGroup.position.y = -0.3;
    scene.add(orbGroup);

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 10;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    containerRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.8;
    controls.minDistance = 6;
    controls.maxDistance = 12;
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.5;

    // Rounded rect alpha map
    const alphaCanvas = document.createElement('canvas');
    const alphaCtx = alphaCanvas.getContext('2d')!;
    alphaCanvas.width = 256;
    alphaCanvas.height = 256;
    const r = 20;
    alphaCtx.beginPath();
    alphaCtx.moveTo(r, 0);
    alphaCtx.lineTo(alphaCanvas.width - r, 0);
    alphaCtx.quadraticCurveTo(alphaCanvas.width, 0, alphaCanvas.width, r);
    alphaCtx.lineTo(alphaCanvas.width, alphaCanvas.height - r);
    alphaCtx.quadraticCurveTo(alphaCanvas.width, alphaCanvas.height, alphaCanvas.width - r, alphaCanvas.height);
    alphaCtx.lineTo(r, alphaCanvas.height);
    alphaCtx.quadraticCurveTo(0, alphaCanvas.height, 0, alphaCanvas.height - r);
    alphaCtx.lineTo(0, r);
    alphaCtx.quadraticCurveTo(0, 0, r, 0);
    alphaCtx.closePath();
    alphaCtx.fillStyle = 'white';
    alphaCtx.fill();
    const sharedAlphaMap = new THREE.CanvasTexture(alphaCanvas);

    const startTime = performance.now();

    const animate = () => {
      if (!mounted) return;
      animationId = requestAnimationFrame(animate);

      const elapsed = (performance.now() - startTime) / 1000;

      const origin = new THREE.Vector3(0, 0, 0);
      const isClosing = closeStartRef.current > 0;
      const closeElapsed = isClosing ? (performance.now() - closeStartRef.current) / 1000 : 0;
      const closeDuration = 0.8;
      const closeStaggerTotal = 0.4;

      for (const card of cards) {
        if (isClosing) {
          const reverseDelay = ((totalItems - 1 - cards.indexOf(card)) / totalItems) * closeStaggerTotal;
          const ct = Math.min(1, Math.max(0, (closeElapsed - reverseDelay) / (closeDuration - closeStaggerTotal)));
          const ease = easeInExpo(ct);
          const s = 1 - ease;
          card.mesh.position.lerpVectors(card.targetPos, origin, ease);
          card.mesh.scale.setScalar(s);
          card.material.opacity = s;
          if (s > 0.01) {
            card.mesh.lookAt(origin);
            card.mesh.rotateY(Math.PI);
          }
        } else {
          const t = Math.min(1, Math.max(0, (elapsed - card.delay) / (entranceDuration - card.delay)));
          const ease = easeOutExpo(t);
          card.mesh.position.lerpVectors(origin, card.targetPos, ease);
          card.mesh.scale.setScalar(ease);
          card.material.opacity = ease;
          if (ease > 0.01) {
            card.mesh.lookAt(origin);
            card.mesh.rotateY(Math.PI);
          }
        }
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const addCard = (index: number, phi: number, theta: number, cardCanvas: HTMLCanvasElement) => {
      if (!mounted) return;

      const texture = new THREE.CanvasTexture(cardCanvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;

      const geometry = new THREE.PlaneGeometry(baseWidth, baseHeight);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true,
        alphaMap: sharedAlphaMap,
        opacity: 0,
        depthWrite: true,
        depthTest: true,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(0, 0, 0);
      mesh.scale.setScalar(0);

      const targetPos = new THREE.Vector3(
        sphereRadius * Math.cos(theta) * Math.sin(phi),
        sphereRadius * Math.sin(theta) * Math.sin(phi),
        sphereRadius * Math.cos(phi),
      );

      const delay = (index / totalItems) * staggerTotal;

      orbGroup.add(mesh);
      cards.push({
        mesh,
        geometry,
        material,
        texture,
        targetPos,
        targetLookAt: new THREE.Vector3(0, 0, 0),
        delay,
      });
    };

    // Create cards for each partner
    for (let i = 0; i < totalItems; i++) {
      const phi = Math.acos(-1 + (2 * i) / totalItems);
      const theta = Math.sqrt(totalItems * Math.PI) * phi;
      const partner = partners[i];

      if (partner.image) {
        // Load image-based card
        const logoCanvas = document.createElement('canvas');
        logoCanvas.width = 512;
        logoCanvas.height = 320;
        const logoCtx = logoCanvas.getContext('2d')!;
        logoCtx.fillStyle = '#ffffff';
        logoCtx.fillRect(0, 0, 512, 320);

        const img = new Image();
        img.crossOrigin = 'anonymous';
        const capturedIndex = i;
        const capturedPhi = phi;
        const capturedTheta = theta;
        img.onload = () => {
          if (!mounted) return;
          const maxW = 512 * 0.6;
          const maxH = 320 * 0.6;
          const scale = Math.min(maxW / img.width, maxH / img.height);
          const w = img.width * scale;
          const h = img.height * scale;
          const x = (512 - w) / 2;
          const y = (320 - h) / 2;
          logoCtx.drawImage(img, x, y, w, h);
          addCard(capturedIndex, capturedPhi, capturedTheta, logoCanvas);
        };
        img.onerror = () => {
          // Fallback to text card if image fails
          if (!mounted) return;
          const textCanvas = createTextCard(partner);
          addCard(capturedIndex, capturedPhi, capturedTheta, textCanvas);
        };
        img.src = partner.image;
      } else {
        // Create text-based card
        const textCanvas = createTextCard(partner);
        addCard(i, phi, theta, textCanvas);
      }
    }

    const handleResize = () => {
      if (!mounted || !containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      mounted = false;
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);

      cards.forEach(({ mesh, geometry, material, texture }) => {
        if (mesh.parent) mesh.parent.remove(mesh);
        geometry.dispose();
        material.dispose();
        texture.dispose();
      });

      sharedAlphaMap.dispose();
      controls.dispose();

      if (renderer) {
        if (containerRef.current && renderer.domElement) {
          try {
            containerRef.current.removeChild(renderer.domElement);
          } catch {}
        }
        renderer.dispose();
      }

      rendererRef.current = null;
    };
  }, [isReady, visible]);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        background: 'rgba(0,0,0,0.85)',
        opacity: 0,
        animation: 'orbFadeIn 0.6s ease forwards',
      }}
    >
      <style>{`
        @keyframes orbFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 z-[10001] w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
          <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
        </svg>
      </button>

      {/* Title */}
      <div className="absolute top-8 left-0 right-0 text-center z-[10001] pointer-events-none">
        <p className="text-white/50 text-xs tracking-[0.2em] uppercase mb-2">COLLABORATIONS</p>
        <h2 className="text-white text-2xl md:text-4xl font-semibold">
          Our Global{' '}
          <span style={{ fontFamily: "'Times New Roman', serif", fontStyle: 'italic', fontWeight: 400 }}>
            Partners
          </span>
        </h2>
        <p className="text-white/40 text-sm mt-2">Drag to rotate &middot; Scroll to zoom</p>
      </div>

      {/* Partner count badge */}
      <div className="absolute bottom-8 left-0 right-0 text-center z-[10001] pointer-events-none">
        <p className="text-white/30 text-sm">{partners.length}+ Global Collaborations</p>
      </div>

      {/* 3D Container */}
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
};

export default PartnersOrb;
