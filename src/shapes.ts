import Drawable, { PathCreator, DrawableKind } from "./Drawable";
import { Style } from "./types";

export type RectangleOptions = {
  width: number;
  height: number;
  scale: number;
  rotate: number;
  anchor: Point;
};

type Point = number[];

const deg2rad = a => (a * Math.PI) / 180;

function rotatePoint(angle: number, point: Point) {
  const x = point[0];
  const y = point[1];
  point[0] = Math.cos(angle) * x + Math.sin(angle) * y;
  point[1] = -Math.sin(angle) * x + Math.cos(angle) * y;
}

function translatePoint(t: Point, point: Point) {
  const x = point[0];
  const x1 = t[0];
  const y = point[1];
  const y1 = t[1];

  point[0] = x + x1;
  point[1] = y + y1;
}

function createRectanglePath(
  x: number,
  y: number,
  { width, height, scale, rotate, anchor = [0, 0] }: RectangleOptions
): Path2D {
  const points: Point[] = [[0, 0], [width, 0], [width, height], [0, height]];

  const path = new Path2D();

  points.forEach((p, i) => {
    translatePoint([anchor[0] * -width, anchor[1] * -height], p);
    rotatePoint(deg2rad(rotate), p);
    translatePoint([x, y], p);

    if (i === 0) {
      path.moveTo(p[0], p[1]);
    } else {
      path.lineTo(p[0], p[1]);
    }
  });

  path.closePath();
  return path;
}

type DrawableCreator<O> = (
  x: number,
  y: number,
  options: O,
  style?: Style
) => Drawable<O>;

function createDrawableCreator<O>(
  pathCreator: PathCreator<O>,
  kind: DrawableKind
): DrawableCreator<O> {
  return function(x: number, y: number, options: O, style?: Style) {
    const d = new Drawable<O>(x, y, pathCreator, options, style);
    d.kind = kind;
    return d;
  };
}

export const createRectangle = createDrawableCreator<RectangleOptions>(
  createRectanglePath,
  "shape"
);
