import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";

// Headings + body: General Sans (matches the reference screenshots).
loadFont({
  family: "General Sans",
  url: staticFile("fonts/GeneralSans-Variable.woff2"),
  weight: "200 700",
  format: "woff2",
});

// Mono labels / readouts.
loadMono();
