import { Group, Line, PaintStyle, Path, SkPaint, SkPath, Skia, StrokeCap, StrokeJoin, SweepGradient, Vector, rect } from "@shopify/react-native-skia";
import { fitRect } from "./geometry";
import { Dimensions, useWindowDimensions } from "react-native";


const strokeWidth = 15;
const pad = 75;
const { width, height } = Dimensions.get("window");

export const dst = rect(pad, pad, width - pad * 2, height - pad * 4);

const repeat = <T,>(input: T[], i: number, result: T[] = []): T[] => {
  if (i <= 0) {
    return result;
  }
  return repeat(input, i - 1, result.concat(input));
};

const colors = [
  "#816FE3",
  "#9F5EE2",
  "#BD4CE0",
  "#DE589F",
  "#FF645E",
  "#FDA859",
  "#FAEC54",
  "#9EE671",
];

const basePaint = Skia.Paint();
basePaint.setStrokeWidth(strokeWidth);
basePaint.setStyle(PaintStyle.Stroke);
basePaint.setStrokeJoin(StrokeJoin.Round);
basePaint.setStrokeCap(StrokeCap.Round);

export const prepare = (svg: string) => {
  const path = Skia.Path.MakeFromSVGString(svg)!;
  const src = path.computeTightBounds();
  const m3 = fitRect(src, dst);
  path.transform(m3);
  return { path };
};

export interface Line {
  p1: Vector;
  p2: Vector;
  length: number;
  paint: SkPaint;
}

interface GradientAlongPathProps {
  path: SkPath;
  progress: any;
}

export const GradientAlongPath = ({
  path,
  progress,
}: GradientAlongPathProps) => {
  const size = useWindowDimensions();

  return (
    <Group>
      {/* <SweepGradient
        c={{
          x: size.height / 5 * 2,
          y: size.width / 5 * 2,
        }}
        colors={colors}
      /> */}
      <Path
        path={path}
        end={progress}
        style="stroke" 
        strokeWidth={strokeWidth}
      />
    </Group>
  )
};