import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const NODE_COUNT = 72;
const SPHERE_RADIUS = 2.6;
const CONNECTION_DIST = 1.4;
const MAX_CONNECTIONS = 120;

function buildGeometry() {
  // Distribute nodes on sphere surface using Fibonacci spiral
  const positions = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < NODE_COUNT; i++) {
    const y = 1 - (i / (NODE_COUNT - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    positions.push(
      new THREE.Vector3(
        Math.cos(theta) * r * SPHERE_RADIUS,
        y * SPHERE_RADIUS,
        Math.sin(theta) * r * SPHERE_RADIUS
      )
    );
  }

  // Build edges
  const linePositions = [];
  let count = 0;
  for (let i = 0; i < NODE_COUNT && count < MAX_CONNECTIONS; i++) {
    for (let j = i + 1; j < NODE_COUNT && count < MAX_CONNECTIONS; j++) {
      if (positions[i].distanceTo(positions[j]) < CONNECTION_DIST) {
        linePositions.push(positions[i].x, positions[i].y, positions[i].z);
        linePositions.push(positions[j].x, positions[j].y, positions[j].z);
        count++;
      }
    }
  }

  return { positions, linePositions: new Float32Array(linePositions) };
}

function NetworkMesh({ mouseRef }) {
  const groupRef = useRef();
  const { positions, linePositions } = useMemo(buildGeometry, []);

  // Node geometry
  const nodeGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(positions.flatMap((p) => [p.x, p.y, p.z]));
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return geo;
  }, [positions]);

  // Edge geometry
  const lineGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    return geo;
  }, [linePositions]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    // Slow auto-rotation
    groupRef.current.rotation.y = t * 0.09;
    groupRef.current.rotation.x = t * 0.03;

    // Mouse-reactive tilt
    const mx = mouseRef.current.x * 0.3;
    const my = mouseRef.current.y * 0.2;
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      -mx * 0.15,
      0.04
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      t * 0.03 + my * 0.12,
      0.04
    );
  });

  return (
    <group ref={groupRef}>
      {/* Edges */}
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color="#00FFFF" transparent opacity={0.12} />
      </lineSegments>

      {/* Nodes — rendered as Points */}
      <points geometry={nodeGeo}>
        <pointsMaterial
          color="#00FFFF"
          size={0.055}
          sizeAttenuation
          transparent
          opacity={0.85}
        />
      </points>

      {/* Core glow sphere */}
      <mesh>
        <sphereGeometry args={[SPHERE_RADIUS * 0.18, 16, 16]} />
        <meshBasicMaterial color="#00FFFF" transparent opacity={0.06} />
      </mesh>

      {/* Outer atmosphere */}
      <mesh>
        <sphereGeometry args={[SPHERE_RADIUS * 1.05, 32, 32]} />
        <meshBasicMaterial color="#00FFFF" transparent opacity={0.015} side={THREE.BackSide} />
      </mesh>

      {/* Accent ring — acid green */}
      <mesh rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[SPHERE_RADIUS * 0.88, 0.008, 8, 80]} />
        <meshBasicMaterial color="#39FF14" transparent opacity={0.35} />
      </mesh>

      {/* Second ring at tilt */}
      <mesh rotation={[0.4, 0.6, 0]}>
        <torusGeometry args={[SPHERE_RADIUS * 0.95, 0.005, 8, 80]} />
        <meshBasicMaterial color="#00FFFF" transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

function MouseTracker({ mouseRef }) {
  const { gl } = useThree();
  useEffect(() => {
    const canvas = gl.domElement;
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [gl, mouseRef]);
  return null;
}

export default function NetworkOrb({ className = '' }) {
  const mouseRef = useRef({ x: 0, y: 0 });

  return (
    <div className={className} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <MouseTracker mouseRef={mouseRef} />
        <NetworkMesh mouseRef={mouseRef} />
      </Canvas>
    </div>
  );
}
