import React from "react";
import { AbsoluteFill } from "remotion";
import { C, SANS } from "../theme";
import { Rise, usePulse } from "../anim";
import { SceneBg } from "../SceneBg";

export const S02Problem: React.FC = () => {
  const glow = usePulse();
  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse 60% 40% at 18% 30%, rgba(229,72,77,0.07), transparent 70%), #08090b",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "0 120px",
        color: "#fff",
        fontFamily: SANS,
      }}
    >
      <SceneBg accent={C.red} index="02" ringX={0.78} ringY={0.32} />
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
          The real problem
        </div>
      </Rise>

      <div
        style={{
          marginTop: 40,
          fontSize: 96,
          fontWeight: 700,
          lineHeight: 1.04,
          letterSpacing: "-0.025em",
          maxWidth: 860,
        }}
      >
        <Rise delay={12} blur={12}>
          <div>Detection is easy.</div>
        </Rise>
        <Rise delay={22} blur={12}>
          <div>
            Staying{" "}
            <span
              style={{
                color: C.red,
                textShadow: `0 0 ${20 + glow * 24}px rgba(229,72,77,${0.3 + glow * 0.3})`,
              }}
            >
              invisible
            </span>{" "}
            isn’t.
          </div>
        </Rise>
      </div>

      <Rise delay={36}>
        <div
          style={{
            marginTop: 48,
            fontSize: 33,
            lineHeight: 1.55,
            color: "rgba(255,255,255,0.6)",
            maxWidth: 760,
          }}
        >
          The white cane works — but it announces you.
        </div>
      </Rise>
    </AbsoluteFill>
  );
};
