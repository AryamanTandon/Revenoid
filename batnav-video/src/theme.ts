export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

export const C = {
  green: "#36E0A0",
  amber: "#F5A623",
  red: "#E5484D",
  bg: "#08090b",
};

export const SANS = "'General Sans', sans-serif";
export const MONO = "'JetBrains Mono', monospace";

// One entry per Design key-frame, in order. Durations in frames @30fps.
export const SCENES: { id: string; dur: number }[] = [
  { id: "01", dur: 110 }, // signature hook
  { id: "02", dur: 140 }, // the problem
  { id: "03", dur: 175 }, // hero (3D)
  { id: "04", dur: 175 }, // how it sees
  { id: "05", dur: 180 }, // proximity feedback
  { id: "06", dur: 180 }, // the clever fix
  { id: "07", dur: 180 }, // real & open
  { id: "08", dur: 150 }, // outro
];

export const TRANSITION = 18;

// TransitionSeries total = sum(durations) - sum(transition overlaps)
export const TOTAL =
  SCENES.reduce((a, s) => a + s.dur, 0) - TRANSITION * (SCENES.length - 1);

// Global start frame of each scene on the TransitionSeries timeline.
export const SCENE_STARTS: number[] = SCENES.reduce<number[]>((acc, _s, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + SCENES[i - 1].dur - TRANSITION);
  return acc;
}, []);
