import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { SCENES, TRANSITION, TOTAL, C } from "./theme";
import { SceneHook } from "./SceneHook";
import { Hero3D } from "./Hero3D";
import { S02Problem } from "./scenes/S02Problem";
import { S04HowItSees } from "./scenes/S04HowItSees";
import { S05Proximity } from "./scenes/S05Proximity";
import { S06Fix } from "./scenes/S06Fix";
import { S07Open } from "./scenes/S07Open";
import { S08Outro } from "./scenes/S08Outro";
import { Soundtrack } from "./Soundtrack";

const SCENE_COMPONENTS: Record<string, React.FC> = {
  "01": SceneHook,
  "02": S02Problem,
  "03": Hero3D,
  "04": S04HowItSees,
  "05": S05Proximity,
  "06": S06Fix,
  "07": S07Open,
  "08": S08Outro,
};

const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [0, TOTAL], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", pointerEvents: "none" }}>
      <div style={{ height: 6, width: "100%", background: "rgba(255,255,255,0.06)" }}>
        <div
          style={{
            height: "100%",
            width: `${p * 100}%`,
            background: C.green,
            boxShadow: "0 0 16px rgba(54,224,160,0.7)",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

export const BatNavVideo: React.FC = () => {
  const children: React.ReactNode[] = [];
  SCENES.forEach((s, i) => {
    const Comp = SCENE_COMPONENTS[s.id];
    children.push(
      <TransitionSeries.Sequence key={`s${s.id}`} durationInFrames={s.dur}>
        <Comp />
      </TransitionSeries.Sequence>,
    );
    if (i < SCENES.length - 1) {
      children.push(
        <TransitionSeries.Transition
          key={`t${s.id}`}
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />,
      );
    }
  });

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <TransitionSeries>{children}</TransitionSeries>
      <ProgressBar />
      <Soundtrack />
    </AbsoluteFill>
  );
};
