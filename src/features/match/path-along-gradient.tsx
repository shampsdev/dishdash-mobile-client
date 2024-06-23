import { Fill, Group, LinearGradient, PaintStyle, Path, Shader, SkPaint, SkPath, Skia, StrokeCap, StrokeJoin, TileMode, Vector, dist, interpolateColors, rect, vec } from "@shopify/react-native-skia";
import { PathGeometry, fitRect, getPointAtLength } from "./geometry";
import { Dimensions, StyleSheet } from "react-native";
import { useAnimatedProps } from "react-native-reanimated";

const strokeWidth = 15;
const pad = 75;
const { width, height } = Dimensions.get("window");

export const dst = rect(pad, pad, width - pad * 2, height - pad * 2);

const repeat = <T,>(input: T[], i: number, result: T[] = []): T[] => {
  if (i <= 0) {
    return result;
  }
  return repeat(input, i - 1, result.concat(input));
};

const colors = repeat(
  [
    "#3FCEBC",
    // "#3CBCEB",
    // "#5F96E7",
    // "#816FE3",
    // "#9F5EE2",
    // "#BD4CE0",
    // "#DE589F",
    // "#FF645E",
    // "#FDA859",
    // "#FAEC54",
    // "#9EE671",
    // "#67E282",
    // "#3FCEBC",
  ],
  1
);
const inputRange = colors.map((_, i) => i / (colors.length - 1));

const basePaint = Skia.Paint();
basePaint.setStrokeWidth(strokeWidth);
basePaint.setStyle(PaintStyle.Stroke);
basePaint.setStrokeJoin(StrokeJoin.Round);
basePaint.setStrokeCap(StrokeCap.Round);

const tolerance = StyleSheet.hairlineWidth;
const tessellate = (geo: PathGeometry, t0: number, t1: number): Line[] => {
  const p0 = geo.getPointAtLength(t0);
  const p1 = geo.getPointAtLength(t1);
  const t05 = (t0 + t1) / 2;
  const p05 = getPointAtLength(0.5 * dist(p0, p1), p0, p1);
  const c05 = geo.getPointAtLength(t05);
  const d = dist(p05, c05);
  if (d > tolerance || dist(p0, p1) > 40) {
    return [...tessellate(geo, t0, t05), ...tessellate(geo, t05, t1)];
  } else {
    const paint = basePaint.copy();

    // const colors2 = repeat([
    //   Skia.Color("#3FCEBC"),
    //   Skia.Color("#3CBCEB"),
    //   Skia.Color("#5F96E7")
    // ], 1);

    // const startColor = interpolateColors(
    //   t0 / geo.getTotalLength(),
    //   inputRange,
    //   colors
    // );
    // const endColor = interpolateColors(
    //   t1 / geo.getTotalLength(),
    //   inputRange,
    //   colors
    // );

    const gradientShader = Skia.Shader.MakeLinearGradient(
      p0, // Начало градиента
      p1, // Конец градиента
      [Skia.Color('red'), Skia.Color('blue')], // Цвета градиента
      null, // Позиции
      TileMode.Clamp // Режим тайлинга
    );

    // const shader = Skia.Shader.MakeLinearGradient(
    //   p0,
    //   p1,
    //   colors2,
    //   // [Skia.Color(startColor), Skia.Color(endColor)],
    //   null,
    //   TileMode.Clamp
    // );

    paint.setShader(gradientShader);
    return [{ p1: p0, p2: p1, length: t0, paint }];
  }
};

export const prepare = (svg: string) => {
  const path = Skia.Path.MakeFromSVGString(svg)!;
  const src = path.computeTightBounds();
  const m3 = fitRect(src, dst);
  path.transform(m3);
  const geo = new PathGeometry(path);
  const totalLength = geo.getTotalLength();
  const lines = tessellate(geo, 0, totalLength);
  return { path, totalLength, lines };
};

export interface Line {
  p1: Vector;
  p2: Vector;
  length: number;
  paint: SkPaint;
}

interface GradientAlongPathProps {
  path: SkPath;
  totalLength: number;
  lines: Line[];
  progress: any;
}

export const GradientAlongPath = ({
  path,
  progress,
  lines,
  totalLength,
}: GradientAlongPathProps) => {
  const paint = Skia.Paint();
  const gradient = Skia.Shader.MakeLinearGradient(
    vec(0, 0),
    vec(256, 0),
    [Skia.Color('red'), Skia.Color('blue')], 
    null,
    TileMode.Clamp
  );
  paint.setShader(gradient);

  return (
    <Group>
      {/* <Fill color='black' /> */}
      <Path 
        path={path}
        color='red'
        end={progress} 
        style="stroke" 
        strokeWidth={strokeWidth}
      />
    </Group>
  )
};