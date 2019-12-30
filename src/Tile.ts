import { DrawableInterface, DrawableKind } from "./Drawable";
import { Pos } from "./types";
import { GroupInterface } from "./Group";

class Tile implements DrawableInterface {
  constructor(x: number, y: number, size: number) {
    this._position = { x, y };
    this._size = size;
  }

  private _position: Pos;
  private _size: number;
  private _parent: GroupInterface;
  private _context: CanvasRenderingContext2D;

  get parent() {
    return this._parent;
  }

  set parent(p: GroupInterface) {
    this._parent = p;
  }

  get position() {
    return this._position;
  }

  set position(p: Pos) {
    this._position = p;
  }

  get context() {
    return this._context;
  }

  set context(c: CanvasRenderingContext2D) {
    this._context = c;
  }

  get kind(): DrawableKind {
    return "tile";
  }

  public draw() {}
}
