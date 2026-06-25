import "./index.css";
import "./fonts";
import { Composition } from "remotion";
import { BatNavVideo } from "./BatNavVideo";
import { FPS, HEIGHT, TOTAL, WIDTH } from "./theme";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="BatNAV"
      component={BatNavVideo}
      durationInFrames={TOTAL}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};
