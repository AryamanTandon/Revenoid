import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { SANS } from "./theme";

// Shared living backdrop: drifting blueprint grid + expanding sonar rings +
// a huge ghost scene-numeral + vignette. Fills the empty bands and adds motion.
export const SceneBg: React.FC<{
  accent: string;
  index: string;
  ringX?: number;
  ringY?: number;
  numeral?: boolean;
}> = ({ accent, index, ringX = 0.82, ringY = 0.42, numeral = true }) => {
  const frame = useCurrentFrame();
  const g = 64;
  const off = (frame * 0.25) % g;
  const rings = [0, 1, 2, 3].map((i) => {
    const p = ((frame * 0.006 + i / 4) % 1);
    return { r: 120 + p * 760, o: (1 - p) * 0.16 };
  });

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <pattern
            id={`grid-${index}`}
            width={g}
            height={g}
            patternUnits="userSpaceOnUse"
            x={off}
            y={off}
          >
            <path
              d={`M ${g} 0 L 0 0 0 ${g}`}
              fill="none"
              stroke="rgba(255,255,255,0.035)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${index})`} />
        {rings.map((rg, i) => (
          <circle
            key={i}
            cx={1080 * ringX}
            cy={1920 * ringY}
            r={rg.r}
            fill="none"
            stroke={accent}
            strokeOpacity={rg.o}
            strokeWidth={2}
          />
        ))}
      </svg>

      {numeral ? (
        <div
          style={{
            position: "absolute",
            right: -36,
            top: 90,
            fontFamily: SANS,
            fontSize: 540,
            fontWeight: 700,
            lineHeight: 0.8,
            letterSpacing: "-0.04em",
            color: "rgba(255,255,255,0.03)",
          }}
        >
          {index}
        </div>
      ) : null}

      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 92% 72% at 50% 45%, transparent 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
