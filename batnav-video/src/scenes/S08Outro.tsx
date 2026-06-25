import React from "react";
import { AbsoluteFill } from "remotion";
import { C, SANS } from "../theme";
import { Pop, Rise, usePulse } from "../anim";
import { SceneBg } from "../SceneBg";

export const S08Outro: React.FC = () => {
  const glow = usePulse(0.1, 0.5, 1);
  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% 64%, rgba(54,224,160,0.12), transparent 72%), #08090b",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 80px",
        color: "#fff",
        fontFamily: SANS,
      }}
    >
      <SceneBg accent={C.green} index="08" ringX={0.5} ringY={0.5} numeral={false} />
      <Rise delay={6}>
        <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: C.green, textShadow: "0 0 20px rgba(54,224,160,0.5)" }}>
          See the path · walk free
        </div>
      </Rise>
      <Rise delay={14} blur={14}>
        <div style={{ marginTop: 44, fontSize: 118, fontWeight: 700, lineHeight: 1.0, letterSpacing: "-0.035em", textAlign: "center" }}>
          Navigation
          <br />
          you wear.
        </div>
      </Rise>

      <Pop delay={34} style={{ marginTop: 84 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 16,
            padding: "34px 70px",
            borderRadius: 999,
            background: C.green,
            color: "#06231a",
            fontSize: 38,
            fontWeight: 700,
            boxShadow: `0 0 ${50 + glow * 40}px rgba(54,224,160,${0.4 + glow * 0.3})`,
          }}
        >
          View the project →
        </div>
      </Pop>

      <Rise delay={48}>
        <div style={{ marginTop: 72, fontSize: 40, fontWeight: 700, color: C.green, textShadow: "0 0 34px rgba(54,224,160,0.55)", textAlign: "center", lineHeight: 1.25 }}>
          makersasylum.com/project/
          <br />
          project-bat-nav
        </div>
      </Rise>
      <Rise delay={56}>
        <div style={{ marginTop: 40, fontSize: 22, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
          Open-source wearable · UN SDG 10
        </div>
      </Rise>
    </AbsoluteFill>
  );
};
