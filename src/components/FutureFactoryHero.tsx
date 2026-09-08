import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Eye, Factory, Layers3, Pause, Play, Rotate3D } from 'lucide-react';
import { Component, ReactNode, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';

type FactoryView = 'all' | 'production' | 'strategy';

type SceneProps = {
  activeView: FactoryView;
  isRunning: boolean;
  isVisible: boolean;
  isInteractive: boolean;
};

const VIEW_COPY: Record<FactoryView, { kicker: string; title: string; detail: string }> = {
  all: {
    kicker: 'LOF + STRATEGY',
    title: '意思決定と実行を、一つの構造へ。',
    detail: '1Fの現場と2Fの経営企画を、AIが閉じたループで接続',
  },
  production: {
    kicker: '01 / LOF',
    title: '現場で学び、実行する。',
    detail: '6本の製造レーン・搬送・検査・ロボットによる実装レイヤー',
  },
  strategy: {
    kicker: '02 / STRATEGY',
    title: '経営判断を生成する。',
    detail: '人とAI人格が議論し、戦略と次のアクションを設計',
  },
};

const viewButtons: Array<{ value: FactoryView; label: string; icon: typeof Layers3 }> = [
  { value: 'all', label: '全体', icon: Layers3 },
  { value: 'production', label: '1F LOF', icon: Factory },
  { value: 'strategy', label: '2F 経営企画', icon: Eye },
];

const palette = {
  structure: '#172653',
  floor: '#1d3568',
  dark: '#080d1c',
  silver: '#b8c8e8',
  blue: '#2e49ff',
  cyan: '#57ddff',
  warm: '#f6bd68',
  glass: '#6d9dff',
  green: '#62b89c',
};

function Box({
  position,
  scale,
  color,
  emissive,
  opacity = 1,
}: {
  position: [number, number, number];
  scale: [number, number, number];
  color: string;
  emissive?: string;
  opacity?: number;
}) {
  return (
    <mesh position={position} castShadow opacity={opacity} receiveShadow>
      <boxGeometry args={scale} />
      <meshStandardMaterial
        color={color}
        emissive={emissive ?? color}
        emissiveIntensity={emissive ? 0.62 : 0}
        metalness={emissive ? 0.38 : 0.24}
        roughness={emissive ? 0.3 : 0.48}
        transparent={opacity < 1}
        opacity={opacity}
      />
    </mesh>
  );
}

function Human({ position, rotation = 0 }: { position: [number, number, number]; rotation?: number }) {
  return (
    <group position={position} rotation-y={rotation}>
      <Box position={[0, 0.72, 0]} scale={[0.34, 0.66, 0.26]} color={palette.silver} />
      <mesh position={[0, 1.28, 0]} castShadow>
        <sphereGeometry args={[0.2, 10, 8]} />
        <meshStandardMaterial color={palette.warm} roughness={0.7} />
      </mesh>
      <Box position={[-0.1, 0.18, 0]} scale={[0.1, 0.5, 0.14]} color={palette.structure} />
      <Box position={[0.1, 0.18, 0]} scale={[0.1, 0.5, 0.14]} color={palette.structure} />
    </group>
  );
}

function Agent({ position, phase = 0 }: { position: [number, number, number]; phase?: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const group = ref.current;
    if (!group) return;
    group.rotation.y += delta * 0.8;
    group.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.7 + phase) * 0.09;
  });

  return (
    <group ref={ref} position={position}>
      <mesh castShadow>
        <octahedronGeometry args={[0.3]} />
        <meshStandardMaterial color={palette.blue} emissive={palette.blue} emissiveIntensity={0.85} />
      </mesh>
      <mesh rotation-x={Math.PI / 2}>
        <torusGeometry args={[0.45, 0.025, 8, 30]} />
        <meshBasicMaterial color={palette.cyan} />
      </mesh>
    </group>
  );
}

function RobotArm({ position, phase }: { position: [number, number, number]; phase: number }) {
  const pivot = useRef<THREE.Group>(null);
  useFrame((state) => {
    const arm = pivot.current;
    if (!arm) return;
    arm.rotation.y = Math.sin(state.clock.elapsedTime * 1.35 + phase) * 0.42;
  });

  return (
    <group position={position}>
      <mesh position={[0, 0.3, 0]} castShadow>
        <cylinderGeometry args={[0.24, 0.32, 0.6, 12]} />
        <meshStandardMaterial color={palette.structure} metalness={0.45} roughness={0.35} />
      </mesh>
      <group ref={pivot} position={[0, 0.58, 0]}>
        <Box position={[-0.1, 0.48, 0]} scale={[0.2, 0.98, 0.2]} color={palette.silver} />
        <Box position={[-0.48, 0.96, 0]} scale={[0.78, 0.16, 0.18]} color={palette.silver} />
        <Box position={[-0.87, 0.82, 0]} scale={[0.16, 0.42, 0.2]} color={palette.warm} emissive={palette.warm} />
      </group>
    </group>
  );
}

function ProductionFloor({ visible }: { visible: boolean }) {
  const parcels = useRef<Array<THREE.Mesh | null>>([]);
  useFrame((state) => {
    if (!visible) return;
    const time = state.clock.elapsedTime;
    parcels.current.forEach((parcel, index) => {
      if (!parcel) return;
      parcel.position.z = ((time * 0.72 + index * 1.72) % 9.6) - 4.8;
    });
  });

  return (
    <group visible={visible}>
      <Box position={[0, -0.3, 0]} scale={[15.8, 0.6, 11.8]} color={palette.structure} />
      <Box position={[0, 0.02, 0]} scale={[15.2, 0.08, 11.2]} color={palette.floor} />
      {[-5.4, -3.6, -1.8, 0, 1.8, 3.6, 5.4].map((x) => (
        <group key={x}>
          <Box position={[x, 0.5, 0]} scale={[1.1, 0.48, 8.2]} color={palette.structure} />
          <Box position={[x, 0.77, 0]} scale={[0.84, 0.07, 8.2]} color={palette.dark} />
          <Box position={[x - 0.54, 0.82, 0]} scale={[0.035, 0.035, 8.25]} color={palette.cyan} emissive={palette.cyan} />
          <Box position={[x + 0.54, 0.82, 0]} scale={[0.035, 0.035, 8.25]} color={palette.cyan} emissive={palette.cyan} />
        </group>
      ))}
      {Array.from({ length: 21 }, (_, index) => {
        const lane = index % 7;
        const x = -5.4 + lane * 1.8;
        return (
          <mesh
            key={index}
            ref={(node) => { parcels.current[index] = node; }}
            position={[x, 1.05, -4.8 + (index % 3) * 2.6]}
            castShadow
          >
            <boxGeometry args={[0.5, 0.34, 0.62]} />
            <meshStandardMaterial color={palette.silver} metalness={0.55} roughness={0.24} />
          </mesh>
        );
      })}
      {[-4.5, -1.8, 0.9, 3.6].map((x, index) => (
        <RobotArm key={x} position={[x, 0.02, index % 2 === 0 ? -2.5 : 2.2]} phase={index} />
      ))}
      {[-7.45, 7.45].flatMap((x) => [-5.3, 5.3].map((z) => (
        <Box key={`${x}-${z}`} position={[x, 2.35, z]} scale={[0.22, 4.7, 0.22]} color={palette.silver} />
      )))}
      <Box position={[0, 2.65, -5.48]} scale={[14.9, 4.8, 0.06]} color={palette.glass} opacity={0.13} />
    </group>
  );
}

function StrategyFloor({ visible }: { visible: boolean }) {
  const hologram = useRef<THREE.Group>(null);
  useFrame((_, rawDelta) => {
    const group = hologram.current;
    if (!group || !visible) return;
    group.rotation.y += Math.min(rawDelta, 0.05) * 0.42;
  });

  return (
    <group position={[0, 4.7, 0]} visible={visible}>
      <Box position={[0, 0, 0]} scale={[15.8, 0.38, 11.8]} color={palette.structure} />
      <Box position={[0, 0.22, 0]} scale={[15.2, 0.07, 11.2]} color={palette.floor} />
      <Box position={[0, 2.1, -5.48]} scale={[14.9, 3.7, 0.06]} color={palette.glass} opacity={0.14} />
      <Box position={[-4.5, 2.2, -5.2]} scale={[5.2, 2.2, 0.18]} color={palette.dark} />
      <Box position={[3.8, 2.2, -5.2]} scale={[4.2, 2.2, 0.18]} color={palette.dark} />
      {[-6.1, -5.35, -4.6, -3.85, -3.1].map((x, index) => (
        <Box key={x} position={[x, 1.85, -5.08]} scale={[0.38, 0.35 + index * 0.22, 0.04]} color={index % 2 ? palette.blue : palette.cyan} emissive={index % 2 ? palette.blue : palette.cyan} />
      ))}
      {[2.5, 3.25, 4, 4.75, 5.5].map((x, index) => (
        <Box key={x} position={[x, 2.48 - index * 0.15, -5.08]} scale={[0.5, 0.045, 0.04]} color={palette.cyan} emissive={palette.cyan} />
      ))}
      <mesh position={[-1.2, 1.05, 0]} scale={[1, 0.66, 1]} castShadow>
        <cylinderGeometry args={[1.7, 1.7, 0.16, 32]} />
        <meshStandardMaterial color={palette.silver} metalness={0.65} roughness={0.2} />
      </mesh>
      <group ref={hologram} position={[-1.2, 2.12, 0]}>
        <mesh>
          <icosahedronGeometry args={[0.54, 1]} />
          <meshBasicMaterial color={palette.cyan} wireframe transparent opacity={0.78} />
        </mesh>
        <mesh rotation-x={Math.PI / 2}>
          <torusGeometry args={[0.9, 0.02, 6, 48]} />
          <meshBasicMaterial color={palette.blue} />
        </mesh>
      </group>
      {Array.from({ length: 6 }, (_, index) => {
        const angle = index * Math.PI / 3;
        const position: [number, number, number] = [-1.2 + Math.cos(angle) * 2.3, 0.35, Math.sin(angle) * 1.85];
        return index % 2 === 0
          ? <Human key={index} position={position} rotation={angle + Math.PI} />
          : <Agent key={index} position={[position[0], 1.35, position[2]]} phase={index} />;
      })}
      {[[-6, -3], [4.8, -2.6], [4.8, 1.2]].map(([x, z], index) => (
        <group key={`${x}-${z}`}>
          <Box position={[x, 0.9, z]} scale={[2.1, 0.12, 1]} color={palette.silver} />
          <Box position={[x, 1.38, z - 0.34]} scale={[1.1, 0.72, 0.05]} color={palette.dark} />
          <Box position={[x, 1.38, z - 0.3]} scale={[0.92, 0.52, 0.025]} color={index % 2 ? palette.blue : palette.cyan} emissive={index % 2 ? palette.blue : palette.cyan} />
        </group>
      ))}
      {[-7.3, 7.3].flatMap((x) => [-5.3, 5.3].map((z) => (
        <Box key={`${x}-${z}`} position={[x, 2.1, z]} scale={[0.18, 4.2, 0.18]} color={palette.silver} />
      )))}
    </group>
  );
}

function CameraRig({ activeView }: { activeView: FactoryView }) {
  const controls = useRef<React.ElementRef<typeof OrbitControls>>(null);
  const target = activeView === 'production' ? 1.1 : activeView === 'strategy' ? 5.9 : 3.25;

  useFrame((_, rawDelta) => {
    const control = controls.current;
    if (!control) return;
    const factor = 1 - Math.exp(-4 * Math.min(rawDelta, 0.05));
    control.target.y = THREE.MathUtils.lerp(control.target.y, target, factor);
    control.update();
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[15.5, 11.5, 19.5]} fov={36} />
      <OrbitControls
        ref={controls}
        makeDefault
        target={[0, 3.25, 0]}
        enablePan={false}
        enableDamping
        dampingFactor={0.07}
        minDistance={15}
        maxDistance={32}
        minPolarAngle={0.42}
        maxPolarAngle={1.28}
      />
    </>
  );
}

function FactoryScene({ activeView, isRunning, isVisible, isInteractive }: SceneProps) {
  const world = useRef<THREE.Group>(null);
  const all = activeView === 'all';

  useFrame((_, rawDelta) => {
    const group = world.current;
    if (!group || !isRunning || !isVisible || isInteractive) return;
    group.rotation.y += Math.min(rawDelta, 0.05) * 0.1;
  });

  return (
    <>
      <CameraRig activeView={activeView} />
      <ambientLight intensity={0.45} />
      <hemisphereLight args={['#a9dfff', '#080d1c', 1.5]} />
      <directionalLight position={[-10, 18, 13]} intensity={2.2} castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[9, 8, -6]} intensity={32} color={palette.blue} distance={28} />
      <group ref={world} rotation-y={-0.14}>
        <ProductionFloor visible={all || activeView === 'production'} />
        <StrategyFloor visible={all || activeView === 'strategy'} />
        {all && (
          <group position={[8.2, 0, -3.7]}>
            <Box position={[0, 2.35, 0]} scale={[1.15, 4.7, 1.3]} color={palette.glass} opacity={0.13} />
            <Box position={[-0.52, 2.35, 0]} scale={[0.08, 4.7, 1.3]} color={palette.silver} />
            <Box position={[0.52, 2.35, 0]} scale={[0.08, 4.7, 1.3]} color={palette.silver} />
          </group>
        )}
      </group>
    </>
  );
}

class FactoryErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function FactoryFallback() {
  return (
    <div className="factory-fallback" role="img" aria-label="LOFと経営企画戦略室をつなぐ二階建て工場">
      <Factory aria-hidden="true" />
      <span>LOF + STRATEGY</span>
    </div>
  );
}

const FutureFactoryHero = () => {
  const [activeView, setActiveView] = useState<FactoryView>('all');
  const [isRunning, setIsRunning] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = window.matchMedia('(max-width: 768px)');
    setIsRunning(!reduced.matches);
    setIsMobile(mobile.matches);
    const onMobileChange = (event: MediaQueryListEvent) => setIsMobile(event.matches);
    mobile.addEventListener('change', onMobileChange);
    return () => mobile.removeEventListener('change', onMobileChange);
  }, []);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry?.isIntersecting ?? false), { threshold: 0.05 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const copy = VIEW_COPY[activeView];

  return (
    <div ref={containerRef} className={`factory-visual${isInteractive ? ' is-interactive' : ''}`}>
      <div className="factory-scan" aria-hidden="true" />
      {!isReady && (
        <div className="factory-loading" aria-live="polite">
          <Factory aria-hidden="true" />
          <span>FACTORY SYSTEM 起動中</span>
        </div>
      )}
      <FactoryErrorBoundary fallback={<FactoryFallback />}>
        <Canvas
          className="factory-canvas"
          dpr={[1, 1.5]}
          shadows
          frameloop={isVisible ? 'always' : 'never'}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          onCreated={() => setIsReady(true)}
          aria-label="LOFと経営企画戦略室をつなぐ二階建て3D工場。ドラッグで回転、ホイールで拡大縮小できます。"
        >
          <FactoryScene
            activeView={activeView}
            isRunning={isRunning}
            isVisible={isVisible}
            isInteractive={isInteractive}
          />
        </Canvas>
      </FactoryErrorBoundary>

      <div className="factory-toolbar" aria-label="3D工場の表示切替">
        {viewButtons.map(({ value, label, icon: Icon }) => (
          <Button
            key={value}
            type="button"
            variant="ghost"
            size="sm"
            className="factory-view-btn"
            aria-pressed={activeView === value}
            title={`${label}を表示`}
            onClick={() => setActiveView(value)}
          >
            <Icon aria-hidden="true" />
            <span>{label}</span>
          </Button>
        ))}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="factory-play-btn"
          aria-label={isRunning ? '自動回転を停止' : '自動回転を再生'}
          title={isRunning ? '自動回転を停止' : '自動回転を再生'}
          onClick={() => setIsRunning((current) => !current)}
        >
          {isRunning ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
        </Button>
      </div>

      <div className="factory-caption" aria-live="polite">
        <span>{copy.kicker}</span>
        <strong>{copy.title}</strong>
        <small>{copy.detail}</small>
      </div>

      {isMobile && !isInteractive && (
        <Button type="button" className="factory-activate" onClick={() => setIsInteractive(true)}>
          <Rotate3D aria-hidden="true" />
          3Dを操作
        </Button>
      )}
      {isMobile && isInteractive && (
        <Button type="button" variant="ghost" className="factory-release" onClick={() => setIsInteractive(false)}>
          操作を終了
        </Button>
      )}
    </div>
  );
};

export default FutureFactoryHero;