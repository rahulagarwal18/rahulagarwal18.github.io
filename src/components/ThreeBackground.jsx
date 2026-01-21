import { useRef, useLayoutEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Float, Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Lightweight scroll-reactive camera
function SceneController() {
    const { camera } = useThree();

    useLayoutEffect(() => {
        camera.position.set(0, 0, 18);

        ScrollTrigger.create({
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 2,
            onUpdate: (self) => {
                camera.position.z = 18 - (self.progress * 45);
                camera.position.y = -self.progress * 5;
                camera.rotation.z = self.progress * 0.3;
            }
        });
    }, [camera]);

    return null;
}

// Optimized wireframe shape
function TechShape({ position, color, type = 'icosahedron', scale = 1, rotationSpeed = 1 }) {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.15 * rotationSpeed;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.2 * rotationSpeed;
        }
    });

    return (
        <mesh ref={meshRef} position={position} scale={scale}>
            {type === 'icosahedron' && <icosahedronGeometry args={[1, 0]} />}
            {type === 'torus' && <torusKnotGeometry args={[0.7, 0.2, 64, 12]} />}
            {type === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
            {type === 'ring' && <torusGeometry args={[1, 0.08, 12, 40]} />}
            {type === 'box' && <boxGeometry args={[1, 1, 1]} />}
            <meshBasicMaterial color={color} wireframe={true} transparent opacity={0.8} />
        </mesh>
    );
}

// Simple glowing planet
function Planet({ position, color, size = 1 }) {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.08;
        }
    });

    return (
        <mesh ref={meshRef} position={position}>
            <sphereGeometry args={[size, 16, 16]} />
            <meshBasicMaterial color={color} transparent opacity={0.6} />
        </mesh>
    );
}

// Floating code snippet using HTML overlay (very lightweight)
function CodeSnippet({ position, code, color = "#00ff00" }) {
    const groupRef = useRef();

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
        }
    });

    return (
        <group ref={groupRef} position={position}>
            <Html
                transform
                occlude={false}
                style={{
                    fontSize: '10px',
                    fontFamily: 'monospace',
                    color: color,
                    background: 'rgba(0,0,0,0.5)',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    border: `1px solid ${color}40`,
                    whiteSpace: 'pre',
                    pointerEvents: 'none',
                    opacity: 0.8,
                }}
            >
                {code}
            </Html>
        </group>
    );
}

// Lightweight grid
function TechGrid({ position = [0, -6, -15] }) {
    return (
        <gridHelper
            args={[60, 30, '#00d4ff', '#002244']}
            position={position}
        />
    );
}

// Falling stars diagonally from right
function FallingStars() {
    return (
        <>
            {Array.from({ length: 80 }).map((_, i) => (
                <FallingStar key={i} index={i} />
            ))}
        </>
    );
}

function FallingStar({ index }) {
    const meshRef = useRef();
    const speedRef = useRef(Math.random() * 0.15 + 0.08);
    const startXRef = useRef(Math.random() * 8 + 22); // Right side (22-30)
    const startYRef = useRef(Math.random() * 8 + 18); // Top side (18-26)

    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.elapsedTime * speedRef.current;
            
            // Diagonal fall: from right-top to left-bottom
            meshRef.current.position.x = startXRef.current - time * 15; // Move left faster
            meshRef.current.position.y = startYRef.current - time * 20; // Move down faster
            meshRef.current.position.z = 0;
            
            // Twinkle and rotate
            meshRef.current.rotation.x += 0.03;
            meshRef.current.rotation.y += 0.04;
            const scale = 0.7 + Math.sin(time * 5) * 0.3;
            meshRef.current.scale.setScalar(scale);
            
            // Opacity changes with twinkle
            const opacity = 0.7 + Math.sin(time * 4) * 0.3;
            if (meshRef.current.material) {
                meshRef.current.material.opacity = opacity;
            }
            
            // Reset when off screen (bottom-left)
            if (meshRef.current.position.x < -30 || meshRef.current.position.y < -25) {
                meshRef.current.position.x = startXRef.current;
                meshRef.current.position.y = startYRef.current;
            }
        }
    });

    return (
        <mesh ref={meshRef} position={[startXRef.current, startYRef.current, 0]}>
            <octahedronGeometry args={[0.5, 0]} />
            <meshBasicMaterial 
                color="#00d4ff" 
                transparent 
                opacity={0.9}
                emissive="#00d4ff"
                emissiveIntensity={0.8}
                wireframe={false}
            />
        </mesh>
    );
}

// Optimized particle field
function ParticleField() {
    const count = 800;
    const mesh = useRef();

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            temp.push(
                (Math.random() - 0.5) * 60,
                (Math.random() - 0.5) * 60,
                (Math.random() - 0.5) * 60 - 15
            );
        }
        return new Float32Array(temp);
    }, []);

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.y = state.clock.elapsedTime * 0.01;
        }
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={particles} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial size={0.06} color="#ffffff" transparent opacity={0.5} sizeAttenuation />
        </points>
    );
}

// Orbiting ring effect for Hero
function OrbitRing({ radius = 3, color = "#00d4ff", position = [0, 0, 0] }) {
    const ringRef = useRef();

    useFrame((state) => {
        if (ringRef.current) {
            ringRef.current.rotation.x = state.clock.elapsedTime * 0.3;
            ringRef.current.rotation.z = state.clock.elapsedTime * 0.2;
        }
    });

    return (
        <mesh ref={ringRef} position={position}>
            <torusGeometry args={[radius, 0.02, 16, 100]} />
            <meshBasicMaterial color={color} transparent opacity={0.6} />
        </mesh>
    );
}


const ThreeBackground = () => {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, background: 'linear-gradient(to bottom, #030310, #000005)' }}>
            <Canvas
                gl={{ antialias: false, powerPreference: 'high-performance' }}
                dpr={[1, 1.5]}
            >
                <SceneController />

                {/* Minimal Lighting */}
                <ambientLight intensity={0.3} />

                {/* Stars */}
                <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.3} />
                <ParticleField />

                {/* Tech Grid */}
                <TechGrid />

                {/* ========== TOP INTRO ZONE (z: 25 to 18) - Entry Scene ========== */}
                <TechShape position={[0, 0, 28]} color="#00d4ff" type="octahedron" scale={2.5} rotationSpeed={0.5} />
                <TechShape position={[-7, 3, 26]} color="#ff00ff" type="icosahedron" scale={1.5} rotationSpeed={0.7} />
                <TechShape position={[7, -2, 27]} color="#00ffaa" type="ring" scale={2} rotationSpeed={0.6} />
                <Planet position={[-9, 2, 25]} color="#0088ff" size={1} />
                <Planet position={[10, -3, 26]} color="#00ff88" size={0.9} />
                <OrbitRing radius={3.5} color="#ff00ff" position={[0, 1, 27]} />
                <CodeSnippet position={[-6, 2, 24]} code={`Welcome!\nRahul Agarwal\nDeveloper`} color="#00d4ff" />
                <CodeSnippet position={[6, -1, 25]} code={`Innovation\nCoding\nAI/ML`} color="#ff00ff" />

                {/* ========== HERO ZONE (z: 12 to 18) - Enhanced ========== */}
                {/* Main rotating structure */}
                <TechShape position={[0, 0, 16]} color="#00d4ff" type="icosahedron" scale={3} rotationSpeed={0.4} />

                {/* Orbiting rings around hero */}
                <OrbitRing radius={4} color="#00d4ff" position={[0, 0, 16]} />
                <OrbitRing radius={5.5} color="#ff00ff" position={[0, 0, 16]} />

                {/* Side shapes */}
                <TechShape position={[6, 2, 14]} color="#00ffff" type="octahedron" scale={1.5} rotationSpeed={0.7} />
                <TechShape position={[-6, -1, 15]} color="#0088ff" type="box" scale={1.2} rotationSpeed={0.9} />
                <TechShape position={[-5, 3, 17]} color="#00d4ff" type="ring" scale={1.8} rotationSpeed={0.5} />
                <TechShape position={[5, -3, 13]} color="#00ffaa" type="octahedron" scale={1} rotationSpeed={1.1} />

                {/* Floating planets */}
                <Planet position={[-8, 4, 12]} color="#0066ff" size={1.2} />
                <Planet position={[9, -2, 14]} color="#00aaff" size={0.8} />

                {/* Coding snippets floating around Hero */}
                <CodeSnippet
                    position={[-7, 1, 15]}
                    code={`const ai = new AI();\nai.train(data);`}
                    color="#00ff88"
                />
                <CodeSnippet
                    position={[7, 2, 14]}
                    code={`function solve() {\n  return magic;\n}`}
                    color="#00d4ff"
                />
                <CodeSnippet
                    position={[-5, -3, 16]}
                    code={`import React\nfrom 'react';`}
                    color="#ff00ff"
                />
                <CodeSnippet
                    position={[6, -2, 17]}
                    code={`// AI/ML\n// IoT\n// Web`}
                    color="#ffaa00"
                />

                {/* ========== SKILLS ZONE (z: 5 to -5) ========== */}
                <TechShape position={[-5, 1, 0]} color="#ff00ff" type="torus" scale={2} rotationSpeed={0.6} />
                <TechShape position={[6, -2, -3]} color="#ff66ff" type="octahedron" scale={1.2} rotationSpeed={0.9} />
                <CodeSnippet position={[5, 2, -2]} code={`skills.map(\n  s => s.master()\n)`} color="#ff00ff" />

                {/* ========== PROJECTS ZONE (z: -5 to -15) ========== */}
                <TechShape position={[0, 0, -10]} color="#ffaa00" type="icosahedron" scale={3.5} rotationSpeed={0.4} />
                <TechShape position={[-7, 2, -12]} color="#ff8800" type="ring" scale={1.8} rotationSpeed={0.7} />
                <Planet position={[8, 4, -14]} color="#ff6600" size={1.5} />
                <CodeSnippet position={[-6, -1, -8]} code={`await build();\nawait deploy();`} color="#ffaa00" />

                {/* ========== LEADERSHIP ZONE (z: -15 to -25) ========== */}
                <TechShape position={[0, 1, -22]} color="#00ff88" type="torus" scale={4} rotationSpeed={0.3} />
                <TechShape position={[-8, -2, -25]} color="#00ffaa" type="icosahedron" scale={2} rotationSpeed={0.5} />
                <Planet position={[0, -4, -30]} color="#00ff66" size={2.5} />
                <CodeSnippet position={[5, 2, -20]} code={`lead();\ninspire();\nimpact();`} color="#00ff88" />

                {/* ========== FOOTER ZONE (z: -25 to -35) - Closing Scene ========== */}
                <TechShape position={[0, 0, -32]} color="#00ff88" type="octahedron" scale={3} rotationSpeed={0.4} />
                <TechShape position={[-9, 2, -34]} color="#00ffaa" type="torus" scale={1.5} rotationSpeed={0.6} />
                <TechShape position={[9, -3, -36]} color="#00ff66" type="icosahedron" scale={1.8} rotationSpeed={0.7} />
                <Planet position={[-8, 3, -33]} color="#00ff88" size={1.3} />
                <Planet position={[8, -2, -35]} color="#00ffaa" size={1.1} />
                <OrbitRing radius={4.5} color="#00ff88" position={[0, -1, -32]} />
                <CodeSnippet position={[-7, 1, -30]} code={`const future =\n  innovate();`} color="#00ffaa" />
                <CodeSnippet position={[7, 2, -33]} code={`// Thank you\n// Connect with me`} color="#00ff88" />

                {/* Depth fog */}
                <fog attach="fog" args={['#030310', 12, 50]} />
            </Canvas>
        </div>
    );
};

export default ThreeBackground;
