import { Pos, Parent } from "./types";

export interface DrawableInterface {
  position: Pos;
  draw: () => void;
  context: CanvasRenderingContext2D;
  parent: Parent;
}

export interface PathOwner<O> {
  path: Path2D;
  options: O;
}

export type PathCreator<O> = (x: number, y: number, options: O) => Path2D;

class Drawable<O> implements DrawableInterface, PathOwner<O> {
  constructor(x: number, y: number, pathCreator: PathCreator<O>, options: O) {
    this._position.x = x;
    this._position.y = y;
    this.options = options;
    this.path2d = pathCreator(x, y, options);
    this._pathCreator = pathCreator;
  }

  private _position: Pos = { x: 0, y: 0 };
  private ctx: CanvasRenderingContext2D;
  private path2d: Path2D;
  private opts: O;
  private _parent: Parent;
  private _pathCreator: PathCreator<O>;

  get position() {
    return this._position;
  }

  set position(p: Pos) {
    this.path = this._pathCreator(p.x, p.y, this.options);
    this._position = p;
  }

  public get context() {
    return this.ctx;
  }

  public set context(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  get path() {
    return this.path2d;
  }

  set path(path: Path2D) {
    this.path2d = path;
  }

  get options() {
    return this.opts;
  }

  set options(o: O) {
    this.opts = o;
  }

  get parent() {
    return this._parent;
  }

  set parent(p: Parent) {
    this.position = {
      x: this._position.x + p.position.x,
      y: this._position.y + p.position.y
    };
    this._parent = p;
  }

  public draw() {
    this.context.beginPath();
    this.ctx.fill(this.path);
    this.context.stroke(this.path);
  }
}

export default Drawable;
