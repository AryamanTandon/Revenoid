import React, { useEffect, useState } from "react";
import {
  AbsoluteFill,
  continueRender,
  delayRender,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { ThreeCanvas } from "@remotion/three";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

// Expanding sonar rings emitted from the sensor face.
const Rings: React.FC<{ z: number }> = ({ z }) => {
  const frame = useCurrentFrame();
  return (
    <group position={[0, 0, z]}>
      {[0, 1, 2, 3].map((i) => {
        const p = (frame * 0.01 + i / 4) % 1;
        const s = 0.3 + p * 2.2;
        const op = Math.max(0, 1 - p) * 0.7;
        return (
          <mesh key={i} scale={[s, s, s]}>
            <ringGeometry args={[0.42, 0.5, 48]} />
            <meshBasicMaterial
              color="#36E0A0"
              transparent
              opacity={op}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        );
      })}
    </group>
  );
};

const Scene3D: React.FC<{ obj: THREE.Object3D }> = ({ obj }) => {
  const frame = useCurrentFrame();
  const spin = frame * 0.012 + 0.6;
  return (
    <>
      <ambientLight intensity={1.0} color={0x20242a} />
      <directionalLight intensity={1.1} position={[3, 4, 5]} />
      <pointLight intensity={8} distance={22} color={0x36e0a0} position={[-4, 1, 3]} />
      <pointLight intensity={5} distance={22} color={0xf5a623} position={[3, -3, -2]} />
      <directionalLight intensity={0.6} color={0x88aaff} position={[-2, 2, -4]} />
      <group rotation-y={spin}>
        <group rotation-x={-0.32}>
          <primitive object={obj} />
          <Rings z={0.86} />
          <mesh position={[0, 0, 0.9]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshBasicMaterial color="#9fffe0" />
          </mesh>
        </group>
      </group>
      <EffectComposer>
        <Bloom intensity={0.9} luminanceThreshold={0.2} mipmapBlur />
      </EffectComposer>
    </>
  );
};

// Scene 03 — hero. Loads the housing GLB outside the r3f tree (so Remotion
// waits via delayRender), then renders the rotating model + DOM overlay.
export const Hero3D: React.FC = () => {
  const frame = useCurrentFrame();
  const [obj, setObj] = useState<THREE.Object3D | null>(null);
  const [handle] = useState(() => delayRender("load-housing-glb"));

  useEffect(() => {
    new GLTFLoader().load(
      staticFile("batnav-housing.glb"),
      (gltf) => {
        const s = gltf.scene;
        const mat = new THREE.MeshStandardMaterial({
          color: 0x6b7480,
          metalness: 0.55,
          roughness: 0.5,
          side: THREE.DoubleSide,
        });
        const box = new THREE.Box3().setFromObject(s);
        const center = box.getCenter(new THREE.Vector3());
        s.traverse((o) => {
          const m = o as THREE.Mesh;
          if (m.isMesh) {
            m.material = mat;
            m.geometry.computeVertexNormals();
            const edges = new THREE.LineSegments(
              new THREE.EdgesGeometry(m.geometry, 25),
              new THREE.LineBasicMaterial({
                color: 0x9fffe0,
                transparent: true,
                opacity: 0.55,
              }),
            );
            m.add(edges);
          }
        });
        s.position.sub(center);
        setObj(s);
        continueRender(handle);
      },
      undefined,
      () => continueRender(handle),
    );
  }, [handle]);

  const tO = interpolate(frame, [6, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tY = interpolate(frame, [6, 30], [26, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% 62%, rgba(54,224,160,0.09), transparent 70%), #08090b",
      }}
    >
      {obj ? (
        <ThreeCanvas
          width={1080}
          height={1920}
          camera={{ position: [0, 0.3, 8.6], fov: 38 }}
          gl={{ antialias: true }}
        >
          <Scene3D obj={obj} />
        </ThreeCanvas>
      ) : null}

      <AbsoluteFill
        style={{
          pointerEvents: "none",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 150,
          fontFamily: "'General Sans', sans-serif",
          color: "#fff",
        }}
      >
        <div
          style={{
            opacity: tO,
            transform: `translateY(${tY}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#36E0A0",
              textShadow: "0 0 20px rgba(54,224,160,0.5)",
            }}
          >
            Wearable navigation device
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 212,
              fontWeight: 800,
              letterSpacing: "-0.045em",
              lineHeight: 0.95,
            }}
          >
            BatNAV
          </div>
          <div
            style={{
              marginTop: 26,
              width: 240,
              height: 8,
              borderRadius: 4,
              background: "#36E0A0",
              boxShadow: "0 0 28px rgba(54,224,160,0.8)",
            }}
          />
          <div
            style={{
              marginTop: 44,
              fontSize: 36,
              lineHeight: 1.4,
              color: "rgba(255,255,255,0.62)",
              textAlign: "center",
            }}
          >
            The cane, reimagined for your shoe.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
