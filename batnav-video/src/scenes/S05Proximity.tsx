import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C, SANS } from "../theme";
import { Rise, usePulse } from "../anim";
import { SceneBg } from "../SceneBg";

const Bars: React.FC<{ color: string; lit: number; baseDelay: number; pulse?: boolean }> = ({
  color,
  lit,
  baseDelay,
  pulse,
}) => {
  const frame = useCurrentFrame();
  const pulseV = usePulse(0.18, 0.6, 1);
  return (
    <div style={{ display: "flex", gap: 10 }}>
      {[0, 1, 2, 3, 4].map((i) => {
        const isLit = i < lit;
        const on = interpolate(frame, [baseDelay + i * 6, baseDelay + i * 6 + 8], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const op = isLit ? (pulse ? on * pulseV : on) : 0.16;
        return (
          <span
            key={i}
            style={{
              width: 22,
              height: 54,
              borderRadius: 6,
              background: color,
              opacity: op,
              boxShadow: isLit ? `0 0 14px ${color}` : "none",
              transform: `scaleY(${isLit ? 0.6 + on * 0.4 : 1})`,
              transformOrigin: "bottom",
            }}
          />
        );
      })}
    </div>
  );
};

const Zone: React.FC<{
  delay: number;
  barDelay: number;
  color: string;
  name: string;
  sub: string;
  lit: number;
  pulse?: boolean;
}> = ({ delay, barDelay, color, name, sub, lit, pulse }) => (
  <Rise delay={delay} y={16}>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 32,
        padding: "34px 40px",
        borderRadius: 20,
        background: `${color}10`,
        border: `1px solid ${color}48`,
        boxShadow: `0 0 36px ${color}1f`,
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 34, fontWeight: 700, color, letterSpacing: "0.04em" }}>
          {name}
        </div>
        <div style={{ fontSize: 22, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>{sub}</div>
      </div>
      <Bars color={color} lit={lit} baseDelay={barDelay} pulse={pulse} />
    </div>
  </Rise>
);

export const S05Proximity: React.FC = () => {
  const glow = usePulse();
  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse 70% 45% at 75% 75%, rgba(229,72,77,0.08), transparent 70%), #08090b",
        flexDirection: "column",
        justifyContent: "center",
        padding: "120px 80px",
        color: "#fff",
        fontFamily: SANS,
      }}
    >
      <SceneBg accent={C.amber} index="05" ringX={0.78} ringY={0.7} />
      <Rise delay={4} x={-24}>
        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: C.amber,
            textShadow: "0 0 20px rgba(245,166,35,0.5)",
          }}
        >
          Proximity feedback
        </div>
      </Rise>
      <Rise delay={12} blur={12}>
        <div
          style={{
            marginTop: 32,
            fontSize: 88,
            fontWeight: 700,
            lineHeight: 1.04,
            letterSpacing: "-0.025em",
            maxWidth: 900,
          }}
        >
          Watch the distance{" "}
          <span
            style={{
              color: C.amber,
              textShadow: `0 0 ${20 + glow * 22}px rgba(245,166,35,${0.3 + glow * 0.3})`,
            }}
          >
            light up
          </span>
          .
        </div>
      </Rise>
      <Rise delay={22}>
        <div
          style={{
            marginTop: 40,
            fontSize: 31,
            lineHeight: 1.55,
            color: "rgba(255,255,255,0.6)",
            maxWidth: 820,
          }}
        >
          Far is calm. Close glows amber. Danger pulses red.
        </div>
      </Rise>

      <Rise delay={30} style={{ marginTop: 36 }}>
        <div style={{ display: "flex", gap: 40 }}>
          {[
            ["Far", C.green],
            ["Close", C.amber],
            ["Danger", C.red],
          ].map(([label, col]) => (
            <div
              key={label}
              style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 24, color: "rgba(255,255,255,0.7)" }}
            >
              <span style={{ width: 16, height: 16, borderRadius: "50%", background: col, boxShadow: `0 0 14px ${col}` }} />
              {label}
            </div>
          ))}
        </div>
      </Rise>

      <Rise delay={40} y={36} style={{ marginTop: 48 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            background: "#0e1014",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 28,
            padding: 44,
            height: 700,
            justifyContent: "center",
          }}
        >
          <Zone delay={48} barDelay={58} color={C.green} name="FAR" sub="over 120 cm · calm" lit={1} />
          <Zone delay={58} barDelay={70} color={C.amber} name="CLOSE" sub="40–120 cm · caution" lit={3} />
          <Zone delay={70} barDelay={84} color={C.red} name="DANGER" sub="under 40 cm · pulses hard" lit={5} pulse />
        </div>
      </Rise>
    </AbsoluteFill>
  );
};
