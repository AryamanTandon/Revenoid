import React from "react";
import { AbsoluteFill, staticFile } from "remotion";
import { C, SANS } from "../theme";
import { Rise } from "../anim";
import { SceneBg } from "../SceneBg";

const Row: React.FC<{
  delay: number;
  color: string;
  title: string;
  sub: string;
}> = ({ delay, color, title, sub }) => (
  <Rise delay={delay} y={18}>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 18,
        padding: "24px 26px",
        borderRadius: 16,
        background: `${color}12`,
        border: `1px solid ${color}38`,
      }}
    >
      <span
        style={{
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: color,
          boxShadow: `0 0 16px ${color}`,
          flex: "none",
        }}
      />
      <div>
        <div style={{ fontSize: 30, fontWeight: 700 }}>{title}</div>
        <div style={{ fontSize: 21, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>
          {sub}
        </div>
      </div>
    </div>
  </Rise>
);

export const S04HowItSees: React.FC = () => {
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
      <SceneBg accent={C.green} index="04" />
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
          See it, feel it
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
          What your foot actually feels.
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
          Ultrasonic distance, mapped straight to vibration — no screen, no sound,
          just touch.
        </div>
      </Rise>

      <Rise delay={30} y={36} style={{ marginTop: 56 }}>
        <div
          style={{
            display: "flex",
            gap: 36,
            background: "#0e1014",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 28,
            padding: 44,
            height: 760,
          }}
        >
          <div
            style={{
              position: "relative",
              width: 380,
              flex: "none",
              borderRadius: 20,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <img
              src={staticFile("batnav-cropped.png")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 40%",
                filter: "contrast(1.06) brightness(0.9) saturate(0.9)",
              }}
              alt="BatNAV device"
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(14,16,20,0.3) 0%, transparent 30%, transparent 62%, rgba(14,16,20,0.85) 100%)",
              }}
            />
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 22,
            }}
          >
            <Row delay={40} color={C.green} title="Ultrasonic sensor" sub="HC-SR04 · scans the path" />
            <Row delay={50} color={C.amber} title="Gyroscope" sub="MPU6050 · reads foot angle" />
            <Row delay={60} color={C.red} title="Vibration motors" sub="2× KG-160 · feel the distance" />
            <Row delay={70} color="#ffffff" title="Custom PCB" sub="Zero-PCB · Arduino Nano · 9V" />
          </div>
        </div>
      </Rise>
    </AbsoluteFill>
  );
};
