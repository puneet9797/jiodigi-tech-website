'use client';
import { useEffect, useRef } from 'react';

/* ─── Math helpers ──────────────────────────────────────────── */
type Vec3 = [number, number, number];
type Mat3 = [Vec3, Vec3, Vec3];

function rotX(a: number): Mat3 {
  const c = Math.cos(a), s = Math.sin(a);
  return [[1,0,0],[0,c,-s],[0,s,c]];
}
function rotY(a: number): Mat3 {
  const c = Math.cos(a), s = Math.sin(a);
  return [[c,0,s],[0,1,0],[-s,0,c]];
}
function rotZ(a: number): Mat3 {
  const c = Math.cos(a), s = Math.sin(a);
  return [[c,-s,0],[s,c,0],[0,0,1]];
}
function mulMat(A: Mat3, B: Mat3): Mat3 {
  const R: Mat3 = [[0,0,0],[0,0,0],[0,0,0]];
  for (let i=0;i<3;i++) for (let j=0;j<3;j++) for (let k=0;k<3;k++) R[i][j]+=A[i][k]*B[k][j];
  return R;
}
function mulVec(M: Mat3, v: Vec3): Vec3 {
  return [
    M[0][0]*v[0]+M[0][1]*v[1]+M[0][2]*v[2],
    M[1][0]*v[0]+M[1][1]*v[1]+M[1][2]*v[2],
    M[2][0]*v[0]+M[2][1]*v[1]+M[2][2]*v[2],
  ];
}
function project(v: Vec3, cx: number, cy: number, fov: number): [number,number,number] {
  const z = v[2] + fov;
  if (z <= 0) return [cx, cy, 0];
  const scale = fov / z;
  return [cx + v[0]*scale, cy + v[1]*scale, scale];
}

/* ─── Geometry definitions ──────────────────────────────────── */
const CUBE_V: Vec3[] = [
  [-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],
  [-1,-1, 1],[1,-1, 1],[1,1, 1],[-1,1, 1],
];
const CUBE_E: [number,number][] = [
  [0,1],[1,2],[2,3],[3,0],
  [4,5],[5,6],[6,7],[7,4],
  [0,4],[1,5],[2,6],[3,7],
];

const OCTA_V: Vec3[] = [
  [0,1,0],[0,-1,0],[1,0,0],[-1,0,0],[0,0,1],[0,0,-1],
];
const OCTA_E: [number,number][] = [
  [0,2],[0,3],[0,4],[0,5],
  [1,2],[1,3],[1,4],[1,5],
  [2,4],[4,3],[3,5],[5,2],
];

function makeTetra(): { v: Vec3[], e: [number,number][] } {
  const s = 1/Math.sqrt(3);
  return {
    v: [[s,s,s],[-s,-s,s],[-s,s,-s],[s,-s,-s]],
    e: [[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]],
  };
}

// Icosahedron-ish: just a dodecahedron approximated with rings
function makeRing(n: number, r: number, y: number): { v: Vec3[], e: [number,number][] } {
  const v: Vec3[] = [];
  const e: [number,number][] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    v.push([Math.cos(a)*r, y, Math.sin(a)*r]);
    e.push([i, (i+1)%n]);
  }
  return { v, e };
}

/* ─── Shape config ──────────────────────────────────────────── */
interface Shape {
  verts: Vec3[];
  edges: [number,number][];
  x: number; y: number; z: number;
  rx: number; ry: number; rz: number;
  dRx: number; dRy: number; dRz: number;
  scale: number;
  color: string;
  alpha: number;
}

function createShapes(W: number, H: number): Shape[] {
  const tetra = makeTetra();
  const ring12 = makeRing(12, 1, 0);
  const ring8a = makeRing(8, 1, 0.5);
  const ring8b = makeRing(8, 1, -0.5);

  const palette = [
    'rgba(14,165,233,',   // blue
    'rgba(139,92,246,',   // purple
    'rgba(6,182,212,',    // cyan
    'rgba(16,185,129,',   // green
    'rgba(248,113,113,',  // red-ish
  ];

  const rand = (lo: number, hi: number) => lo + Math.random()*(hi-lo);
  const shapes: Shape[] = [];
  const configs = [
    { v: CUBE_V, e: CUBE_E, scale: 120 },
    { v: CUBE_V, e: CUBE_E, scale: 70 },
    { v: CUBE_V, e: CUBE_E, scale: 55 },
    { v: OCTA_V, e: OCTA_E, scale: 110 },
    { v: OCTA_V, e: OCTA_E, scale: 80 },
    { v: OCTA_V, e: OCTA_E, scale: 60 },
    { v: tetra.v, e: tetra.e, scale: 130 },
    { v: tetra.v, e: tetra.e, scale: 65 },
    { v: ring12.v, e: ring12.e, scale: 120 },
    { v: ring12.v, e: ring12.e, scale: 80 },
    { v: ring8a.v.concat(ring8b.v),
      e: [
        ...ring8a.e,
        ...ring8b.e.map(([a,b]) => [a+8, b+8] as [number,number]),
        ...[0,1,2,3,4,5,6,7].map(i => [i, i+8] as [number,number]),
      ], scale: 90 },
  ];

  // Scale down complexity for viewports < 768px (mobile devices)
  const isMobile = W < 768;
  const filteredConfigs = isMobile 
    ? configs.filter((_, i) => i === 0 || i === 3 || i === 6 || i === 8 || i === 10) // Only 5 shapes
    : configs;

  filteredConfigs.forEach((cfg, i) => {
    const col = palette[i % palette.length];
    const margin = isMobile ? 80 : 200;
    shapes.push({
      verts: cfg.v,
      edges: cfg.e,
      x: rand(margin, W - margin),
      y: rand(-H * 0.1, H * 1.1),
      z: rand(isMobile ? 300 : 200, 900),
      rx: rand(0, Math.PI * 2),
      ry: rand(0, Math.PI * 2),
      rz: rand(0, Math.PI * 2),
      dRx: rand(-0.004, 0.004),
      dRy: rand(-0.007, 0.007),
      dRz: rand(-0.003, 0.003),
      scale: isMobile ? cfg.scale * 0.75 : cfg.scale, // slightly smaller shapes on mobile
      color: col,
      alpha: rand(0.25, 0.55),
    });
  });
  return shapes;
}

/* ─── Grid ──────────────────────────────────────────────────── */
function drawGrid(ctx: CanvasRenderingContext2D, W: number, H: number, t: number) {
  const horizon = H * 0.5;
  const count = 22;
  const speed = (t * 0.3) % 1;

  ctx.save();

  // Vertical lines (perspective)
  for (let i = 0; i <= count; i++) {
    const frac = i / count;
    const xTop = W * frac;
    const xBot = W * 0.5 + (xTop - W * 0.5) * 3.5;
    const alpha = 0.04 + (i === count/2 ? 0.06 : 0);
    ctx.beginPath();
    ctx.moveTo(xTop, horizon);
    ctx.lineTo(xBot, H + 50);
    ctx.strokeStyle = `rgba(14,165,233,${alpha})`;
    ctx.lineWidth = 0.7;
    ctx.stroke();
  }

  // Horizontal lines (moving toward viewer)
  for (let i = 0; i < count; i++) {
    const frac = ((i / count) + speed) % 1;
    // perspective: y maps from horizon → bottom
    const y = horizon + (H - horizon) * (frac * frac);
    const alpha = frac * 0.07;
    // width of horizontal line narrows near horizon
    const xLeft  = W * 0.5 - (W * 0.5) * frac * 1.5;
    const xRight = W * 0.5 + (W * 0.5) * frac * 1.5;
    ctx.beginPath();
    ctx.moveTo(Math.max(0, xLeft), y);
    ctx.lineTo(Math.min(W, xRight), y);
    ctx.strokeStyle = `rgba(14,165,233,${alpha})`;
    ctx.lineWidth = 0.6;
    ctx.stroke();
  }

  ctx.restore();
}

/* ─── Light beams ───────────────────────────────────────────── */
interface Beam {
  x: number; angle: number; width: number;
  color: string; speed: number; phase: number;
}

function createBeams(W: number): Beam[] {
  const isMobile = W < 768;
  const beams = [
    { x: W*0.15, angle: -0.18, width: isMobile ? 80 : 140, color: 'rgba(14,165,233,', speed: 0.5, phase: 0 },
    { x: W*0.82, angle:  0.22, width: isMobile ? 60 : 100, color: 'rgba(139,92,246,', speed: 0.7, phase: 1.5 },
    { x: W*0.50, angle:  0.00, width: isMobile ? 50 : 80,  color: 'rgba(6,182,212,',  speed: 0.4, phase: 3 },
    { x: W*0.30, angle:  0.15, width: 60,  color: 'rgba(139,92,246,', speed: 0.6, phase: 2 },
    { x: W*0.70, angle: -0.12, width: 90,  color: 'rgba(14,165,233,', speed: 0.55, phase: 4 },
  ];
  return isMobile ? beams.slice(0, 2) : beams;
}

function drawBeam(ctx: CanvasRenderingContext2D, beam: Beam, H: number, t: number) {
  const pulse = 0.5 + 0.5 * Math.sin(t * beam.speed + beam.phase);
  const alpha = 0.018 + pulse * 0.025;
  ctx.save();
  ctx.translate(beam.x, 0);
  ctx.rotate(beam.angle);
  const grad = ctx.createLinearGradient(0, 0, 0, H * 1.5);
  grad.addColorStop(0, beam.color + '0)');
  grad.addColorStop(0.2, beam.color + alpha + ')');
  grad.addColorStop(0.6, beam.color + (alpha * 0.6) + ')');
  grad.addColorStop(1, beam.color + '0)');
  ctx.fillStyle = grad;
  ctx.fillRect(-beam.width/2, 0, beam.width, H * 1.5);
  ctx.restore();
}

/* ─── Floating orbs ─────────────────────────────────────────── */
interface Orb {
  x: number; y: number; r: number;
  color: string; phase: number; speed: number; drift: number;
}

function createOrbs(W: number, H: number): Orb[] {
  const isMobile = W < 768;
  const orbs = [
    { x: W*0.1,  y: H*0.2, r: isMobile ? 180 : 260, color: 'rgba(14,165,233,',  phase: 0,   speed: 0.4, drift: 40 },
    { x: W*0.88, y: H*0.15,r: isMobile ? 150 : 220, color: 'rgba(139,92,246,',  phase: 2,   speed: 0.3, drift: 30 },
    { x: W*0.5,  y: H*0.55,r: 180, color: 'rgba(6,182,212,',   phase: 4,   speed: 0.5, drift: 50 },
    { x: W*0.2,  y: H*0.75,r: 200, color: 'rgba(139,92,246,',  phase: 1.5, speed: 0.35,drift: 35 },
    { x: W*0.85, y: H*0.7, r: 240, color: 'rgba(14,165,233,',  phase: 3,   speed: 0.45,drift: 45 },
  ];
  return isMobile ? orbs.slice(0, 3) : orbs;
}

function drawOrb(ctx: CanvasRenderingContext2D, orb: Orb, t: number) {
  const pulse = 0.5 + 0.5 * Math.sin(t * orb.speed + orb.phase);
  const dy = Math.sin(t * orb.speed * 0.7 + orb.phase) * orb.drift;
  const alpha = 0.04 + pulse * 0.06;
  const grad = ctx.createRadialGradient(orb.x, orb.y + dy, 0, orb.x, orb.y + dy, orb.r);
  grad.addColorStop(0, orb.color + alpha + ')');
  grad.addColorStop(1, orb.color + '0)');
  ctx.beginPath();
  ctx.arc(orb.x, orb.y + dy, orb.r, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();
}

/* ─── Floating cross glyphs ─────────────────────────────────── */
interface Glyph { x: number; y: number; size: number; color: string; phase: number; speed: number; }

function createGlyphs(W: number, H: number): Glyph[] {
  const isMobile = W < 768;
  const count = isMobile ? 8 : 18;
  const g: Glyph[] = [];
  const colors = ['rgba(14,165,233,0.25)', 'rgba(139,92,246,0.2)', 'rgba(6,182,212,0.2)'];
  for (let i = 0; i < count; i++) {
    g.push({
      x: Math.random() * W, y: Math.random() * H,
      size: isMobile ? 4 + Math.random() * 8 : 6 + Math.random() * 14, // smaller glyphs on mobile
      color: colors[i % colors.length],
      phase: Math.random() * Math.PI * 2,
      speed: 0.3 + Math.random() * 0.5,
    });
  }
  return g;
}

function drawGlyph(ctx: CanvasRenderingContext2D, g: Glyph, t: number) {
  const pulse = 0.4 + 0.6 * Math.abs(Math.sin(t * g.speed + g.phase));
  const dy = Math.sin(t * g.speed * 0.6 + g.phase) * 15;
  ctx.save();
  ctx.globalAlpha = pulse;
  ctx.strokeStyle = g.color;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(g.x - g.size, g.y + dy);
  ctx.lineTo(g.x + g.size, g.y + dy);
  ctx.moveTo(g.x, g.y + dy - g.size);
  ctx.lineTo(g.x, g.y + dy + g.size);
  ctx.stroke();
  // Small diamond
  ctx.save();
  ctx.translate(g.x, g.y + dy);
  ctx.rotate(Math.PI / 4);
  ctx.strokeRect(-g.size * 0.35, -g.size * 0.35, g.size * 0.7, g.size * 0.7);
  ctx.restore();
  ctx.restore();
}

/* ─── Main Component ────────────────────────────────────────── */
export default function Background3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D | null;
    if (!ctx) return;
    // Re-assert as non-null so closures inherit the narrowed type
    const c = ctx as CanvasRenderingContext2D;


    let W = window.innerWidth;
    let H = document.body.scrollHeight || window.innerHeight;

    const resize = () => {
      W = window.innerWidth;
      H = document.body.scrollHeight || window.innerHeight;
      canvas.width = W;
      canvas.height = H;
      // Rebuild scene on resize
      shapes.length = 0;
      createShapes(W, H).forEach(s => shapes.push(s));
      orbs.length = 0;
      createOrbs(W, H).forEach(o => orbs.push(o));
      beams.length = 0;
      createBeams(W).forEach(b => beams.push(b));
    };

    canvas.width = W;
    canvas.height = H;

    const shapes: Shape[] = createShapes(W, H);
    const orbs: Orb[] = createOrbs(W, H);
    const beams: Beam[] = createBeams(W);
    const glyphs: Glyph[] = createGlyphs(W, H);

    const FOV = 600;
    let t = 0;

    function drawShape(shape: Shape) {
      const M = mulMat(rotX(shape.rx), mulMat(rotY(shape.ry), rotZ(shape.rz)));
      const projected: [number,number,number][] = shape.verts.map(v => {
        const scaled: Vec3 = [v[0]*shape.scale, v[1]*shape.scale, v[2]*shape.scale];
        const rot = mulVec(M, scaled);
        const worldV: Vec3 = [rot[0] + shape.x - W/2, rot[1] + shape.y - H/2, rot[2] + shape.z];
        return project(worldV, W/2, H/2, FOV);
      });

      shape.edges.forEach(([a, b]) => {
        const pa = projected[a], pb = projected[b];
        if (!pa || !pb) return;
        const avgScale = (pa[2] + pb[2]) / 2;
        const depthAlpha = Math.min(1, avgScale * 1.5) * shape.alpha;
        if (depthAlpha < 0.01) return;
        c.beginPath();
        c.moveTo(pa[0], pa[1]);
        c.lineTo(pb[0], pb[1]);
        c.strokeStyle = shape.color + depthAlpha + ')';
        c.lineWidth = Math.max(0.3, avgScale * 0.8);
        c.stroke();
      });

      // Draw vertex dots
      projected.forEach(p => {
        if (!p) return;
        const depthAlpha = Math.min(1, p[2] * 2) * shape.alpha;
        if (depthAlpha < 0.05) return;
        c.beginPath();
        c.arc(p[0], p[1], Math.max(0.5, p[2] * 2), 0, Math.PI * 2);
        c.fillStyle = shape.color + depthAlpha + ')';
        c.fill();
      });
    }

    function animate() {
      c.clearRect(0, 0, W, H);

      // Orbs (background glow)
      orbs.forEach(o => drawOrb(c, o, t));

      // Perspective grid
      drawGrid(c, W, H, t);

      // Light beams
      beams.forEach(b => drawBeam(c, b, H, t));

      // 3D wireframe shapes
      c.save();
      shapes.forEach(shape => {
        shape.rx += shape.dRx;
        shape.ry += shape.dRy;
        shape.rz += shape.dRz;
        // Slow vertical drift
        shape.y += Math.sin(t * 0.3 + shape.rz) * 0.15;
        drawShape(shape);
      });
      c.restore();

      // Floating glyphs
      glyphs.forEach(g => drawGlyph(c, g, t));

      // Horizontal scan-line
      const scanY = (H * ((t * 0.04) % 1));
      const scanGrad = c.createLinearGradient(0, scanY - 40, 0, scanY + 40);
      scanGrad.addColorStop(0, 'rgba(14,165,233,0)');
      scanGrad.addColorStop(0.5, 'rgba(14,165,233,0.025)');
      scanGrad.addColorStop(1, 'rgba(14,165,233,0)');
      c.fillStyle = scanGrad;
      c.fillRect(0, scanY - 40, W, 80);

      t += 0.016;
      rafRef.current = requestAnimationFrame(animate);
    }

    // Delay first render to let DOM settle
    const tid = setTimeout(() => {
      resize();
      animate();
    }, 100);

    window.addEventListener('resize', resize);

    // Re-measure after fonts/images load (page height can change)
    const heightTimer = setInterval(() => {
      const newH = document.body.scrollHeight;
      if (Math.abs(newH - H) > 50) resize();
    }, 2000);

    return () => {
      clearTimeout(tid);
      clearInterval(heightTimer);
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}
