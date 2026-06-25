import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C, MONO, SANS } from "../theme";
import { Pop, Rise, usePulse } from "../anim";
import { SceneBg } from "../SceneBg";

export const S06Fix: React.FC = () => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [60, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tip = Math.round(
    interpolate(frame, [70, 100], [0, 26], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const flash = usePulse(0.22, 0.5, 1);

  return (
    <AbsoluteFill
      style={{
        background: "#08090b",
        flexDirection: "column",
        justifyContent: "center",
        padding: "120px 80px",
        color: "#fff",
        fontFamily: SANS,
      }}
    >
      <SceneBg accent={C.green} index="06" ringX={0.8} ringY={0.72} />
      <Rise delay={4} x={-24}>
        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: C.green,
            textShadow: "0 0 20px rgba(54,224,160,0.5)",
          }}
        >
          The engineering
        </div>
      </Rise>
      <Rise delay={12} blur={12}>
        <div style={{ marginTop: 32, fontSize: 88, fontWeight: 700, lineHeight: 1.04, letterSpacing: "-0.025em", maxWidth: 900 }}>
          The fix that made it usable.
        </div>
      </Rise>
      <Rise delay={22}>
        <div style={{ marginTop: 40, fontSize: 31, lineHeight: 1.55, color: "rgba(255,255,255,0.6)", maxWidth: 840 }}>
          Walking bends the foot — and the sensor saw the ground. So the gyro cuts the
          motors the instant your foot tips.
        </div>
      </Rise>

      <Rise delay={34} y={36} style={{ marginTop: 56 }}>
        <div
          style={{
            position: "relative",
            background: "#0e1014",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 28,
            height: 760,
            overflow: "hidden",
          }}
        >
          <svg viewBox="0 0 892 760" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            <line x1="70" y1="600" x2="822" y2="600" stroke="rgba(255,255,255,0.22)" strokeWidth="2" strokeDasharray="2 12" strokeLinecap="round" />
            <line x1="150" y1="600" x2="560" y2="600" stroke="rgba(54,224,160,0.5)" strokeWidth="3" strokeDasharray="10 10" />
            <path
              d="M 330 600 A 180 180 0 0 0 215 432"
              fill="none"
              stroke={C.amber}
              strokeWidth="2.5"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - draw}
            />
          </svg>

          <div style={{ position: "absolute", left: 48, top: 44, fontFamily: MONO, fontSize: 21, letterSpacing: "0.16em", color: "rgba(255,255,255,0.45)" }}>
            FOOT-TIP CUTOFF
          </div>

          <Rise delay={44} y={0}>
            <div style={{ position: "absolute", left: 150, top: 360, width: 420, height: 120, transform: "rotate(-26deg)", transformOrigin: "0% 100%" }}>
              <div style={{ position: "relative", width: "100%", height: "100%" }}>
                <div style={{ position: "absolute", left: 0, bottom: 24, width: "100%", height: 78, borderRadius: "48px 70px 26px 18px", background: "linear-gradient(180deg,#2a2d34,#1a1c22)", border: "1px solid rgba(255,255,255,0.14)" }} />
                <div style={{ position: "absolute", left: 0, bottom: 6, width: "100%", height: 26, borderRadius: "8px 30px 14px 8px", background: "#0c0d10", border: "1px solid rgba(255,255,255,0.1)" }} />
                <div style={{ position: "absolute", left: 150, bottom: 42, width: 84, height: 48, borderRadius: 8, background: "rgba(54,224,160,0.14)", border: "1px solid rgba(54,224,160,0.5)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: MONO, fontSize: 17, fontWeight: 600, color: C.green }}>
                  MPU
                </div>
                <div style={{ position: "absolute", right: -6, bottom: 30, width: 16, height: 16, borderRadius: "50%", background: C.red, boxShadow: "0 0 14px rgba(229,72,77,0.8)" }} />
              </div>
            </div>
          </Rise>

          <div style={{ position: "absolute", left: 248, top: 520, fontSize: 30, fontWeight: 700, color: C.amber, textShadow: "0 0 20px rgba(245,166,35,0.4)" }}>
            {tip}° tip
          </div>
          <div style={{ position: "absolute", left: 170, top: 618, fontFamily: MONO, fontSize: 18, color: C.green }}>
            threshold = level
          </div>

          <Rise delay={50}>
            <div style={{ position: "absolute", left: 380, top: 300, display: "inline-flex", alignItems: "center", gap: 10, padding: "13px 22px", borderRadius: 999, background: "rgba(54,224,160,0.12)", border: "1px solid rgba(54,224,160,0.4)", color: C.green, fontSize: 23, fontWeight: 600 }}>
              MPU6050 gyro
            </div>
          </Rise>

          <div style={{ position: "absolute", right: 48, top: 120 }}>
            <Pop delay={92}>
              <div style={{ display: "inline-flex", flexDirection: "column", gap: 14, padding: "34px 38px", borderRadius: 20, background: "rgba(245,166,35,0.1)", border: `1px solid rgba(245,166,35,${0.4 + flash * 0.4})`, boxShadow: `0 0 ${30 + flash * 40}px rgba(245,166,35,${0.15 + flash * 0.2})` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ width: 18, height: 18, borderRadius: "50%", background: C.amber, boxShadow: `0 0 ${12 + flash * 12}px rgba(245,166,35,0.9)` }} />
                  <span style={{ fontSize: 32, fontWeight: 700, color: C.amber, letterSpacing: "0.04em" }}>MOTORS CUT</span>
                </div>
                <div style={{ fontSize: 22, color: "rgba(255,255,255,0.6)", maxWidth: 320, lineHeight: 1.45 }}>
                  Tilt past threshold → ground reading ignored. No false buzz mid-stride.
                </div>
              </div>
            </Pop>
          </div>
        </div>
      </Rise>
    </AbsoluteFill>
  );
};
