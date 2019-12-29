import Drawable, { PathCreator, DrawableKind } from "./Drawable";
import { Style } from "./types";

export type RectangleOptions = {
  width: number;
  height: number;
};

function createRectanglePath(
  x: number,
  y: number,
  { width, height }: RectangleOptions
): Path2D {
  const path = new Path2D();
  path.rect(x, y, width, height);
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
  "rectangle"
);

export type EllipseOptions = {
  width: number;
  height: number;
};

function createEllipsePath(
  x: number,
  y: number,
  { width, height }: EllipseOptions
) {
  const path = new Path2D();
  path.ellipse(x, y, width, height, 0, 0, Math.PI * 2);
  return path;
}

export const createEllipse = createDrawableCreator<EllipseOptions>(
  createEllipsePath,
  "ellipse"
);
