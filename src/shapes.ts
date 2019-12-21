import Drawable, { PathCreator } from "./Drawable";

type SquareOptions = {
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

type DrawableCreator<O> = (x: number, y: number, options: O) => Drawable<O>;

function createDrawableCreator<O>(
  pathCreator: PathCreator<O>
): DrawableCreator<O> {
  return function(x: number, y: number, options: O) {
    return new Drawable<O>(x, y, pathCreator, options);
  };
}

export const createSquare = createDrawableCreator<SquareOptions>(
  createSquarePath
);
