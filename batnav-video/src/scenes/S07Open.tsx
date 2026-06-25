import React from "react";
import { AbsoluteFill } from "remotion";
import { C, MONO, SANS } from "../theme";
import { Pop, Rise } from "../anim";
import { SceneBg } from "../SceneBg";

const Item: React.FC<{
  delay: number;
  n: string;
  color: string;
  name: React.ReactNode;
  tag: string;
}> = ({ delay, n, color, name, tag }) => (
  <Rise delay={delay} y={16}>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 22,
        padding: "26px 28px",
        borderRadius: 16,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <span
        style={{
          width: 46,
          height: 46,
          borderRadius: 11,
          background: `${color}24`,
          flex: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: MONO,
          color,
          fontSize: 22,
          fontWeight: 600,
        }}
      >
        {n}
      </span>
      <div style={{ flex: 1, fontSize: 30, fontWeight: 700 }}>{name}</div>
      <span
        style={{
          padding: "9px 18px",
          borderRadius: 999,
          background: `${color}1f`,
          color,
          fontSize: 19,
          fontWeight: 600,
          letterSpacing: "0.08em",
        }}
      >
        {tag}
      </span>
    </div>
  </Rise>
);

export const S07Open: React.FC = () => {
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
      <SceneBg accent={C.green} index="07" ringX={0.82} ringY={0.68} />
      <Rise delay={4} x={-24}>
        <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: C.green, textShadow: "0 0 20px rgba(54,224,160,0.5)" }}>
          Open hardware
        </div>
      </Rise>
      <Rise delay={12} blur={12}>
        <div style={{ marginTop: 32, fontSize: 88, fontWeight: 700, lineHeight: 1.04, letterSpacing: "-0.025em", maxWidth: 900 }}>
          Real parts. Fully documented.
        </div>
      </Rise>
      <Rise delay={22}>
        <div style={{ marginTop: 40, fontSize: 31, lineHeight: 1.55, color: "rgba(255,255,255,0.6)", maxWidth: 820 }}>
          Every component, every file — open and reproducible.
        </div>
      </Rise>

      <Rise delay={30} y={36} style={{ marginTop: 48 }}>
        <div
          style={{
            background: "#0e1014",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 28,
            padding: 44,
            height: 820,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <div style={{ fontSize: 34, fontWeight: 700 }}>Bill of materials</div>
            <div style={{ fontFamily: MONO, fontSize: 21, color: "rgba(255,255,255,0.45)" }}>5 core parts</div>
          </div>
          <div style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 18, flex: 1 }}>
            <Item delay={40} n="01" color={C.green} name="Arduino Nano" tag="MCU" />
            <Item delay={50} n="02" color={C.green} name="HC-SR04" tag="SENSOR" />
            <Item delay={60} n="03" color={C.amber} name="MPU6050" tag="GYRO" />
            <Item
              delay={70}
              n="04"
              color={C.red}
              name={<>KG-160 <span style={{ color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>×2</span></>}
              tag="HAPTICS"
            />
            <Item delay={80} n="05" color="#ffffff" name="Custom PCB" tag="ZERO-PCB" />
          </div>
          <Pop delay={92} style={{ marginTop: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "26px 30px", borderRadius: 16, background: "rgba(54,224,160,0.1)", border: "1px solid rgba(54,224,160,0.4)", boxShadow: "0 0 36px rgba(54,224,160,0.12)" }}>
              <span style={{ width: 34, height: 34, borderRadius: "50%", background: C.green, boxShadow: "0 0 18px rgba(54,224,160,0.8)", flex: "none", display: "flex", alignItems: "center", justifyContent: "center", color: "#06231a", fontWeight: 700, fontSize: 22 }}>
                ✓
              </span>
              <div style={{ fontSize: 27, fontWeight: 700, color: C.green }}>OSHWA certified</div>
              <div style={{ marginLeft: "auto", fontFamily: MONO, fontSize: 23, color: C.green, letterSpacing: "0.08em" }}>IN000035</div>
            </div>
          </Pop>
        </div>
      </Rise>
    </AbsoluteFill>
  );
};
