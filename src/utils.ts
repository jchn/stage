import { Point } from "./types";

export function last(arr: unknown[]) {
  return arr.length ? arr[arr.length - 1] : null;
}

export function boxFromPoints(points: Point[]): Point[] {
  const pts = points.slice();

  const lr = pts.slice().sort((a, b) => a[0] - b[0]); // left to right most
  const tb = pts.slice().sort((a, b) => a[1] - b[1]); // top to bottom most

  const topLeft = [lr[0][0], tb[0][1]];
  const topRight = [this.last(lr)[0], tb[0][1]];
  const bottomRight = [this.last(lr)[0], this.last(tb)[1]];
  const bottomLeft = [lr[0][0], this.last(tb)[1]];

  return [topLeft, topRight, bottomRight, bottomLeft];
}
