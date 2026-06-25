import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

// Fade + rise (+ optional slide-x and focus blur). Wrap any block to animate
// it in at `delay` frames.
export const Rise: React.FC<{
  delay?: number;
  y?: number;
  x?: number;
  blur?: number;
  dur?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ delay = 0, y = 28, x = 0, blur = 0, dur = 16, style, children }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [delay, delay + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        ...style,
        opacity: p,
        transform: `translate(${(1 - p) * x}px, ${(1 - p) * y}px)`,
        filter: blur ? `blur(${(1 - p) * blur}px)` : undefined,
      }}
    >
      {children}
    </div>
  );
};

// Spring pop-in (scale + fade) for badges / buttons.
export const Pop: React.FC<{
  delay?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ delay = 0, style, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, mass: 0.6 },
  });
  return (
    <div style={{ ...style, opacity: s, transform: `scale(${0.7 + s * 0.3})` }}>
      {children}
    </div>
  );
};

export const useReveal = (delay: number, dur = 16) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [delay, delay + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};

// Gentle infinite glow-pulse for accent words.
export const usePulse = (speed = 0.12, min = 0.55, max = 1) => {
  const frame = useCurrentFrame();
  return min + (max - min) * (0.5 + 0.5 * Math.sin(frame * speed));
};
