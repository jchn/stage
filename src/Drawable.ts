import { Pos, Parent, EventType, EventCallback, Style } from "./types";
import InteractionHandler, {
  InteractionHandlerInterface
} from "./InteractionHandler";
import applyStyle from "./applyStyle";

export type DrawableKind = "group" | "text" | "shape" | "unknown";

export interface DrawableInterface {
  position: Pos;
  draw: () => void;
  context: CanvasRenderingContext2D;
  parent: Parent;
  kind: DrawableKind;
}

export interface StyleableInterface {
  style: Style | null;
}

export interface PathOwnerInterface<O> {
  path: Path2D;
  options: O;
}

export type PathCreator<O> = (x: number, y: number, options: O) => Path2D;

class Drawable<O>
  implements
    DrawableInterface,
    PathOwnerInterface<O>,
    InteractionHandlerInterface,
    StyleableInterface {
  constructor(
    x: number,
    y: number,
    pathCreator: PathCreator<O>,
    options: O,
    style: Style = null
  ) {
    this._position.x = x;
    this._position.y = y;
    this.options = options;
    this.path2d = pathCreator(x, y, options);
    this._pathCreator = pathCreator;
    this._interactionHandler = new InteractionHandler(this);
    this._style = style;
  }

  private _position: Pos = { x: 0, y: 0 };
  private _ctx: CanvasRenderingContext2D;
  private path2d: Path2D;
  private opts: O;
  private _parent: Parent;
  private _pathCreator: PathCreator<O>;
  private _interactionHandler: InteractionHandlerInterface;
  private _style: Style | null;
  private _kind: DrawableKind = "unknown";

  get position() {
    return this._position;
  }

  set position(p: Pos) {
    this.path = this._pathCreator(p.x, p.y, this.options);
    this._position = p;
  }

  get style() {
    return this._style;
  }

  set style(s: Style) {
    this._style = s;
  }

  public get context() {
    return this._ctx;
  }

  public set context(ctx: CanvasRenderingContext2D) {
    this._ctx = ctx;
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

  get kind() {
    return this._kind;
  }

  set kind(k: DrawableKind) {
    this._kind = k;
  }

  get handlers() {
    return this._interactionHandler.handlers;
  }

  public draw() {
    if (this.style) {
      this._ctx.save();
      applyStyle(this._ctx, this.style);
    }

    this.context.beginPath();
    this._ctx.fill(this.path);
    this.context.stroke(this.path);

    if (this.style) {
      this._ctx.restore();
    }
  }

  public addEventListener(type: EventType, cb: EventCallback) {
    this._interactionHandler.addEventListener(type, cb);
  }

  public removeEventListener(type: EventType, cb: EventCallback) {
    this._interactionHandler.removeEventListener(type, cb);
  }

  public removeAllEventListeners() {
    this._interactionHandler.removeAllEventListeners();
  }
}

export default Drawable;
