import Drawable, { PathCreator } from "./Drawable";
import { Style } from "./types";

export type SquareOptions = {
  width: number;
  height: number;
};

function createSquarePath(
  x: number,
  y: number,
  { width, height }: SquareOptions
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
  pathCreator: PathCreator<O>
): DrawableCreator<O> {
  return function(x: number, y: number, options: O, style?: Style) {
    return new Drawable<O>(x, y, pathCreator, options, style);
  };
}

export const createSquare = createDrawableCreator<SquareOptions>(
  createSquarePath
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
  createEllipsePath
);
