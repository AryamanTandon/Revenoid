import React from "react";
import { Audio, interpolate, Sequence, staticFile } from "remotion";
import { SCENE_STARTS, TOTAL } from "./theme";

const A = (f: string) => staticFile(`audio/${f}`);

// All audio lives here, synced to global scene start frames — decoupled
// from the scene visuals so timing is easy to tweak in one place.
export const Soundtrack: React.FC = () => {
  const [s1, s2, s3, s4, s5, s6, s7, s8] = SCENE_STARTS;
  const whooshes = [s2, s3, s4, s5, s6, s7, s8];
  return (
    <>
      <Audio
        src={A("music.mp3")}
        volume={(f) =>
          interpolate(f, [0, 25], [0, 0.55], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }) *
          interpolate(f, [TOTAL - 45, TOTAL - 5], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />

      {whooshes.map((f, i) => (
        <Sequence key={`w${i}`} from={Math.max(0, f - 6)}>
          <Audio src={A("whoosh.wav")} volume={0.45} />
        </Sequence>
      ))}

      <Sequence from={s1 + 58}>
        <Audio src={A("ping.wav")} volume={0.7} />
      </Sequence>

      <Sequence from={s3 + 4}>
        <Audio src={A("sweep.wav")} volume={0.7} />
      </Sequence>
      <Sequence from={s3 + 44}>
        <Audio src={A("ping.wav")} volume={0.5} />
      </Sequence>

      <Sequence from={s5 + 58}>
        <Audio src={A("blip.wav")} volume={0.6} />
      </Sequence>
      <Sequence from={s5 + 72}>
        <Audio src={A("blip.wav")} volume={0.6} />
      </Sequence>
      <Sequence from={s5 + 86}>
        <Audio src={A("ping.wav")} volume={0.5} />
      </Sequence>

      <Sequence from={s6 + 92}>
        <Audio src={A("ping.wav")} volume={0.55} />
      </Sequence>

      {[0, 1, 2, 3, 4].map((i) => (
        <Sequence key={`b${i}`} from={s7 + 40 + i * 10}>
          <Audio src={A("blip.wav")} volume={0.4} />
        </Sequence>
      ))}

      <Sequence from={s8 + 34}>
        <Audio src={A("ping.wav")} volume={0.7} />
      </Sequence>
    </>
  );
};
