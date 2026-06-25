import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import frames from "./frames.json";
import { C } from "./theme";
import { SceneBg } from "./SceneBg";

const FRAMES = frames as Record<string, string>;
const POINTS = (FRAMES["01"].match(/points="([^"]+)"/) ?? ["", ""])[1];

// Scene 01 — signature hook. Custom so the ultrasonic waveform draws on
// left-to-right and the caption rises in after.
export const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [6, 76], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const capO = interpolate(frame, [58, 84], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const capY = interpolate(frame, [58, 84], [18, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse 72% 38% at 50% 44%, rgba(54,224,160,0.10), transparent 70%), #08090b",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        fontFamily: "'General Sans', sans-serif",
      }}
    >
      <SceneBg accent={C.green} index="01" ringX={0.85} ringY={0.3} />
      <svg
        viewBox="0 0 1700 300"
        style={{
          width: 960,
          filter:
            "drop-shadow(0 0 7px rgba(54,224,160,0.85)) drop-shadow(0 0 22px rgba(54,224,160,0.45))",
        }}
        preserveAspectRatio="xMidYMid meet"
      >
        <polyline
          fill="none"
          stroke="#36E0A0"
          strokeWidth={3.2}
          strokeLinejoin="round"
          strokeLinecap="round"
          points={POINTS}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - draw}
        />
      </svg>
      <div
        style={{
          marginTop: 96,
          fontSize: 42,
          fontWeight: 600,
          letterSpacing: "-0.01em",
          color: "#fff",
          opacity: capO,
          transform: `translateY(${capY}px)`,
        }}
      >
        Every step sends a signal.
      </div>
    </AbsoluteFill>
  );
};
