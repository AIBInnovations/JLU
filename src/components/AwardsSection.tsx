'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useIsMobile } from '../hooks/useIsMobile';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

export const AwardsSection = () => {
  // Refs for GSAP animations
  const wrapperRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const middleCardRef = useRef<HTMLDivElement>(null);
  const orbContainerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();

  // Wait for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Three.js orb — same as PartnersOrb: draggable, responsive, auto-rotate
  useEffect(() => {
    if (!mounted) return;
    const container = orbContainerRef.current;
    if (!container) return;

    let alive = true;
    let animationId: number | null = null;

    const labels = [
      'No. 1 Private University', 'FICCI Speaker', 'IRM Affiliation',
      '4th in MP', '53rd in India', 'Education World #1',
      'MP Excellence Award', 'UGC Recognized', 'Top Ranked',
      'QS Ranked', 'NIRF Ranked', 'Global Partnerships',
      'Research Excellence', 'Innovation Hub', 'Industry Ready',
      'Central India First', 'Best Campus', 'Top Faculty',
    ];

    const totalItems = labels.length;
    const sphereRadius = 5;
    const baseWidth = 1.2;
    const baseHeight = 0.8;

    const scene = new THREE.Scene();
    const orbGroup = new THREE.Group();
    orbGroup.position.y = -0.3;
    scene.add(orbGroup);

    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 10;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // OrbitControls — draggable, zoomable, auto-rotate (same as PartnersOrb)
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
    const rr = 20;
    alphaCtx.beginPath();
    alphaCtx.moveTo(rr, 0);
    alphaCtx.lineTo(256 - rr, 0);
    alphaCtx.quadraticCurveTo(256, 0, 256, rr);
    alphaCtx.lineTo(256, 256 - rr);
    alphaCtx.quadraticCurveTo(256, 256, 256 - rr, 256);
    alphaCtx.lineTo(rr, 256);
    alphaCtx.quadraticCurveTo(0, 256, 0, 256 - rr);
    alphaCtx.lineTo(0, rr);
    alphaCtx.quadraticCurveTo(0, 0, rr, 0);
    alphaCtx.closePath();
    alphaCtx.fillStyle = 'white';
    alphaCtx.fill();
    const sharedAlphaMap = new THREE.CanvasTexture(alphaCanvas);

    // Create text cards with grey/ocean theme
    const createCard = (text: string): HTMLCanvasElement => {
      const c = document.createElement('canvas');
      c.width = 512;
      c.height = 320;
      const cx = c.getContext('2d')!;

      cx.fillStyle = '#ffffff';
      cx.fillRect(0, 0, 512, 320);

      // Grey-ocean accent bar
      cx.fillStyle = '#21313c';
      cx.fillRect(0, 0, 512, 5);

      cx.fillStyle = '#21313c';
      cx.textAlign = 'center';
      cx.textBaseline = 'middle';

      if (text.length <= 15) {
        cx.font = 'bold 40px Inter, Arial, sans-serif';
        cx.fillText(text, 256, 150);
      } else {
        cx.font = 'bold 28px Inter, Arial, sans-serif';
        const words = text.split(' ');
        const lines: string[] = [];
        let line = '';
        for (const word of words) {
          const test = line ? `${line} ${word}` : word;
          if (cx.measureText(test).width > 440) {
            if (line) lines.push(line);
            line = word;
          } else {
            line = test;
          }
        }
        if (line) lines.push(line);
        const lh = 38;
        const startY = 150 - ((lines.length - 1) * lh) / 2;
        lines.forEach((l, i) => cx.fillText(l, 256, startY + i * lh));
      }

      cx.fillStyle = '#21313c80';
      cx.font = '16px Inter, Arial, sans-serif';
      cx.fillText('RECOGNITION', 256, 275);

      return c;
    };

    const meshes: THREE.Mesh[] = [];

    for (let i = 0; i < totalItems; i++) {
      const phi = Math.acos(-1 + (2 * i) / totalItems);
      const theta = Math.sqrt(totalItems * Math.PI) * phi;

      const cardCanvas = createCard(labels[i]);
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
        opacity: 0.85,
        depthWrite: true,
        depthTest: true,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        sphereRadius * Math.cos(theta) * Math.sin(phi),
        sphereRadius * Math.sin(theta) * Math.sin(phi),
        sphereRadius * Math.cos(phi),
      );
      mesh.lookAt(new THREE.Vector3(0, 0, 0));
      mesh.rotateY(Math.PI);

      orbGroup.add(mesh);
      meshes.push(mesh);
    }

    const origin = new THREE.Vector3(0, 0, 0);
    const animate = () => {
      if (!alive) return;
      animationId = requestAnimationFrame(animate);

      // Keep cards facing outward
      meshes.forEach((mesh) => {
        const worldPos = new THREE.Vector3();
        mesh.getWorldPosition(worldPos);
        mesh.lookAt(worldPos.clone().sub(origin).multiplyScalar(2).add(origin));
      });

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Responsive resize
    const handleResize = () => {
      if (!alive || !container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      alive = false;
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      meshes.forEach((mesh) => {
        const geo = mesh.geometry;
        const mat = mesh.material as THREE.MeshBasicMaterial;
        if (mat.map) mat.map.dispose();
        mat.dispose();
        geo.dispose();
        if (mesh.parent) mesh.parent.remove(mesh);
      });
      sharedAlphaMap.dispose();
      controls.dispose();
      if (container && renderer.domElement) {
        try { container.removeChild(renderer.domElement); } catch {}
      }
      renderer.dispose();
    };
  }, [mounted, isMobile]);

  const awards = [
    {
      image: '/a1.jpeg',
      title: 'IRM International Affiliation — First in Central India',
      description: 'Jagran Lakecity University has become the first university in Central India to be awarded the Certificate of International Affiliation by the Institute of Risk Management (IRM) India Affiliate. This landmark collaboration integrates IRM\'s globally recognised Enterprise Risk Management (ERM) qualifications into the university\'s curriculum.',
      year: '2025',
    },
    {
      image: '/a2.jpeg',
      title: '4th in MP, 53rd in India — India Today Rankings',
      description: 'Jagran Lakecity University has secured the 4th position in Madhya Pradesh and 53rd position in India in the India Today Best University Rankings 2025. The Faculty of Media & Social Sciences was ranked 18th in India Overall and the Faculty of Law ranked 39th in India.',
      year: '2025',
    },
    {
      image: '/a3.jpeg',
      title: 'No. 1 Private Multidisciplinary University — Education World',
      description: 'Jagran Lakecity University, Bhopal has been ranked No. 1 in the Education World India Higher Education Rankings 2025-26 in India under the category Private Multidisciplinary Universities.',
      year: '2025-26',
    },
    {
      image: '/a4.jpeg',
      title: 'MP Excellence Award Sponsor',
      description: 'Jagran Lakecity University was the proud sponsor for the MP Excellence Award 2025 held on 26th October, 2025 at Minto Hall, Bhopal, to honor individuals and groups for their achievements in various fields.',
      year: '2025',
    },
    {
      image: '/a5.jpeg',
      title: 'FICCI Higher Education Summit — Key Speaker',
      description: 'Shri Abhishek Mohan Gupta, Pro-Chancellor, Jagran Lakecity University, was invited as a Key Speaker at the 20th FICCI Higher Education Summit 2025, held on October 6–7, 2025, in New Delhi. He shared valuable insights on shaping globally competitive universities.',
      year: '2025',
    },
  ];

  useEffect(() => {
    if (!mounted) return;
    if (!wrapperRef.current || !headerRef.current || !textContentRef.current || !middleCardRef.current) return;

    const wrapper = wrapperRef.current;
    const headerSection = headerRef.current;
    const textContent = textContentRef.current;
    const middleCard = middleCardRef.current;

    const triggers: ScrollTrigger[] = [];

    // Small delay to ensure DOM is ready after mobile/desktop switch
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // Pin "AWARDS AND ACHIEVEMENTS" text - it stays fixed while cards scroll over it
    const headerPin = ScrollTrigger.create({
      trigger: wrapper,
      start: 'top top',
      end: 'bottom bottom',
      pin: headerSection,
      pinSpacing: false,
      anticipatePin: 1,
    });
    triggers.push(headerPin);

    // Fade out only the text content when middle card reaches it (stays in place, just fades)
    const fadeOutAnimation = gsap.to(textContent, {
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: middleCard,
        start: 'top 60%',
        end: 'top 40%',
        scrub: 1,
      },
    });
    if (fadeOutAnimation.scrollTrigger) {
      triggers.push(fadeOutAnimation.scrollTrigger);
    }

    // Cleanup
    return () => {
      clearTimeout(timeout);
      triggers.forEach((trigger) => trigger.kill());
      ScrollTrigger.refresh();
    };
  }, [mounted, isMobile]);

  return (
    <div
      ref={wrapperRef}
      style={{
        position: 'relative',
        height: isMobile ? '170vh' : '250vh',
        background: 'transparent',
        overflow: 'hidden',
      }}
    >
      {/* AWARDS AND ACHIEVEMENTS - Pinned text */}
      <div
        ref={headerRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          background: '#f6f7f0',
        }}
      >
        <div ref={textContentRef} style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* 3D Orb — draggable, responsive */}
          <div
            ref={orbContainerRef}
            style={{
              position: 'absolute',
              width: isMobile ? '95vw' : '140vh',
              height: isMobile ? '95vw' : '140vh',
              maxWidth: '1800px',
              maxHeight: '1800px',
              pointerEvents: 'auto',
              cursor: 'grab',
            }}
          />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <p
              style={{
                color: '#999',
                fontSize: isMobile ? '0.65rem' : '0.75rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                textAlign: 'center',
                marginBottom: isMobile ? '0.75rem' : '1rem',
              }}
            >
              RECOGNITION
            </p>
            <h2
              style={{
                fontSize: isMobile ? 'clamp(1.5rem, 6vw, 2rem)' : 'clamp(2rem, 5vw, 4rem)',
                fontWeight: 600,
                color: '#21313c',
                textAlign: 'center',
                lineHeight: 1,
                padding: '0 1rem',
              }}
            >
              Awards & Achievements
            </h2>
            <p
              style={{
                color: '#666',
                fontSize: isMobile ? '0.75rem' : 'clamp(0.75rem, 1vw, 1rem)',
                textAlign: 'center',
                marginTop: isMobile ? '1rem' : '2rem',
                marginLeft: 'auto',
                marginRight: 'auto',
                maxWidth: isMobile ? '18rem' : '28rem',
                padding: '0 1rem',
                lineHeight: 1.7,
              }}
            >
              Jagran Lakecity University continues to earn accolades across national and international platforms.{' '}
              <span style={{ color: '#027fa0' }}>Recognized globally.</span>
            </p>
          </div>
        </div>
      </div>

      {/* Cards Container - Scrolls over */}
      <div
        style={{
          position: 'absolute',
          top: isMobile ? '70vh' : '120vh',
          left: 0,
          width: '100%',
          zIndex: 20,
          background: 'transparent',
        }}
      >
        {isMobile ? (
          /* Mobile: Simple 2-column grid layout */
          <div style={{ padding: '0 20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              {/* Row 1: Cards 1 & 2 */}
              {awards.slice(0, 2).map((award, index) => (
                <div key={index}>
                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '1 / 1',
                      overflow: 'hidden',
                      borderRadius: '12px',
                    }}
                  >
                    <img
                      src={award.image}
                      alt={award.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ marginTop: '10px', textAlign: 'center' }}>
                    <p style={{ color: '#027fa0', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>{award.year}</p>
                    <p style={{ color: '#21313c', fontSize: '0.7rem', fontWeight: 600, lineHeight: 1.3, marginBottom: '6px' }}>
                      {award.title}
                    </p>
                    <p style={{ color: '#666', fontSize: '0.6rem', lineHeight: 1.5 }}>
                      {award.description.length > 120 ? award.description.substring(0, 120) + '...' : award.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Row 2: Card 3 centered */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }} ref={middleCardRef}>
              <div style={{ width: 'calc(50% - 8px)' }}>
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '1 / 1',
                    overflow: 'hidden',
                    borderRadius: '12px',
                  }}
                >
                  <img
                    src={awards[2].image}
                    alt={awards[2].title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ marginTop: '10px', textAlign: 'center' }}>
                  <p style={{ color: '#027fa0', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>{awards[2].year}</p>
                  <p style={{ color: '#21313c', fontSize: '0.7rem', fontWeight: 600, lineHeight: 1.3, marginBottom: '6px' }}>
                    {awards[2].title}
                  </p>
                  <p style={{ color: '#666', fontSize: '0.6rem', lineHeight: 1.5 }}>
                    {awards[2].description.length > 120 ? awards[2].description.substring(0, 120) + '...' : awards[2].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Row 3: Cards 4 & 5 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {awards.slice(3, 5).map((award, index) => (
                <div key={index + 3}>
                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '1 / 1',
                      overflow: 'hidden',
                      borderRadius: '12px',
                    }}
                  >
                    <img
                      src={award.image}
                      alt={award.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ marginTop: '10px', textAlign: 'center' }}>
                    <p style={{ color: '#027fa0', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>{award.year}</p>
                    <p style={{ color: '#21313c', fontSize: '0.7rem', fontWeight: 600, lineHeight: 1.3, marginBottom: '6px' }}>
                      {award.title}
                    </p>
                    <p style={{ color: '#666', fontSize: '0.6rem', lineHeight: 1.5 }}>
                      {award.description.length > 120 ? award.description.substring(0, 120) + '...' : award.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Desktop: Scattered positioning layout */
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '1920/1558',
              background: 'transparent',
            }}
          >
            {/* Card 1 - Top Left */}
            <div
              style={{
                position: 'absolute',
                left: '15%',
                top: '5%',
              }}
            >
              <div
                style={{
                  width: 'clamp(166px, 17vw, 400px)',
                  height: 'clamp(167px, 17vw, 400px)',
                  overflow: 'hidden',
                  borderRadius: '16px',
                }}
              >
                <img
                  src={awards[0].image}
                  alt={awards[0].title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }}
                />
              </div>
              <div style={{ marginTop: '12px', textAlign: 'center', maxWidth: 'clamp(166px, 17vw, 400px)' }}>
                <p style={{ color: '#027fa0', fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>{awards[0].year}</p>
                <p style={{ color: '#21313c', fontSize: 'clamp(0.7rem, 0.85vw, 0.875rem)', fontWeight: 600, lineHeight: 1.3, marginBottom: '8px' }}>
                  {awards[0].title}
                </p>
                <p style={{ color: '#666', fontSize: 'clamp(0.6rem, 0.7vw, 0.75rem)', lineHeight: 1.6 }}>
                  {awards[0].description}
                </p>
              </div>
            </div>

            {/* Card 2 - Top Right */}
            <div
              style={{
                position: 'absolute',
                right: '15%',
                top: '8%',
              }}
            >
              <div
                style={{
                  width: 'clamp(166px, 17vw, 400px)',
                  height: 'clamp(167px, 17vw, 400px)',
                  overflow: 'hidden',
                  borderRadius: '16px',
                }}
              >
                <img
                  src={awards[1].image}
                  alt={awards[1].title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }}
                />
              </div>
              <div style={{ marginTop: '12px', textAlign: 'center', maxWidth: 'clamp(166px, 17vw, 400px)' }}>
                <p style={{ color: '#027fa0', fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>{awards[1].year}</p>
                <p style={{ color: '#21313c', fontSize: 'clamp(0.7rem, 0.85vw, 0.875rem)', fontWeight: 600, lineHeight: 1.3, marginBottom: '8px' }}>
                  {awards[1].title}
                </p>
                <p style={{ color: '#666', fontSize: 'clamp(0.6rem, 0.7vw, 0.75rem)', lineHeight: 1.6 }}>
                  {awards[1].description}
                </p>
              </div>
            </div>

            {/* Card 3 - Middle Center */}
            <div
              ref={middleCardRef}
              style={{
                position: 'absolute',
                left: '50%',
                top: '28%',
                transform: 'translateX(-50%)',
              }}
            >
              <div
                style={{
                  width: 'clamp(166px, 17vw, 400px)',
                  height: 'clamp(167px, 17vw, 400px)',
                  overflow: 'hidden',
                  borderRadius: '16px',
                }}
              >
                <img
                  src={awards[2].image}
                  alt={awards[2].title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }}
                />
              </div>
              <div style={{ marginTop: '12px', textAlign: 'center', maxWidth: 'clamp(166px, 17vw, 400px)' }}>
                <p style={{ color: '#027fa0', fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>{awards[2].year}</p>
                <p style={{ color: '#21313c', fontSize: 'clamp(0.7rem, 0.85vw, 0.875rem)', fontWeight: 600, lineHeight: 1.3, marginBottom: '8px' }}>
                  {awards[2].title}
                </p>
                <p style={{ color: '#666', fontSize: 'clamp(0.6rem, 0.7vw, 0.75rem)', lineHeight: 1.6 }}>
                  {awards[2].description}
                </p>
              </div>
            </div>

            {/* Card 4 - Bottom Left */}
            <div
              style={{
                position: 'absolute',
                left: '12%',
                top: '52%',
              }}
            >
              <div
                style={{
                  width: 'clamp(166px, 17vw, 400px)',
                  height: 'clamp(167px, 17vw, 400px)',
                  overflow: 'hidden',
                  borderRadius: '16px',
                }}
              >
                <img
                  src={awards[3].image}
                  alt={awards[3].title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }}
                />
              </div>
              <div style={{ marginTop: '12px', textAlign: 'center', maxWidth: 'clamp(166px, 17vw, 400px)' }}>
                <p style={{ color: '#027fa0', fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>{awards[3].year}</p>
                <p style={{ color: '#21313c', fontSize: 'clamp(0.7rem, 0.85vw, 0.875rem)', fontWeight: 600, lineHeight: 1.3, marginBottom: '8px' }}>
                  {awards[3].title}
                </p>
                <p style={{ color: '#666', fontSize: 'clamp(0.6rem, 0.7vw, 0.75rem)', lineHeight: 1.6 }}>
                  {awards[3].description}
                </p>
              </div>
            </div>

            {/* Card 5 - Bottom Right */}
            <div
              style={{
                position: 'absolute',
                right: '18%',
                top: '55%',
              }}
            >
              <div
                style={{
                  width: 'clamp(166px, 17vw, 400px)',
                  height: 'clamp(167px, 17vw, 400px)',
                  overflow: 'hidden',
                  borderRadius: '16px',
                }}
              >
                <img
                  src={awards[4].image}
                  alt={awards[4].title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }}
                />
              </div>
              <div style={{ marginTop: '12px', textAlign: 'center', maxWidth: 'clamp(166px, 17vw, 400px)' }}>
                <p style={{ color: '#027fa0', fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>{awards[4].year}</p>
                <p style={{ color: '#21313c', fontSize: 'clamp(0.7rem, 0.85vw, 0.875rem)', fontWeight: 600, lineHeight: 1.3, marginBottom: '8px' }}>
                  {awards[4].title}
                </p>
                <p style={{ color: '#666', fontSize: 'clamp(0.6rem, 0.7vw, 0.75rem)', lineHeight: 1.6 }}>
                  {awards[4].description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
