import {
  Pos,
  Parent,
  EventType,
  EventCallback,
  Style,
  Dimensions,
  Point
} from "./types";
import InteractionHandler, {
  InteractionHandlerInterface
} from "./InteractionHandler";
import applyStyle from "./applyStyle";

export type DrawableKind = "group" | "text" | "shape" | "unknown" | "tile";

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

export interface PointsOwnerInterface {
  points: Point[];
}

export type PointsCreator<O> = (
  x: number,
  y: number,
  width: number,
  height: number,
  options: O
) => Point[];

class Drawable<O>
  implements
    DrawableInterface,
    PathOwnerInterface<O>,
    InteractionHandlerInterface,
    StyleableInterface,
    PointsOwnerInterface {
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    pointsCreator: PointsCreator<O>,
    options: O,
    style: Style = null
  ) {
    this._position.x = x;
    this._position.y = y;
    this._options = options;
    this._points = pointsCreator(x, y, width, height, options);
    this._pointsCreator = pointsCreator;
    this._interactionHandler = new InteractionHandler(this);
    this._style = style;
    this._dimensions = { width, height };
  }

  private _position: Pos = { x: 0, y: 0 };
  private _dimensions: Dimensions;
  private _ctx: CanvasRenderingContext2D;
  private _options: O;
  private _parent: Parent;
  private _pointsCreator: PointsCreator<O>;
  private _interactionHandler: InteractionHandlerInterface;
  private _style: Style | null;
  private _kind: DrawableKind = "unknown";
  private _points: Point[];

  get position() {
    return this._position;
  }

  set position(p: Pos) {
    this._points = this._pointsCreator(
      p.x,
      p.y,
      this._dimensions.width,
      this._dimensions.height,
      this.options
    );
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
    const path = new Path2D();
    const points = this._points;

    points.forEach((p, i) => {
      if (i === 0) {
        path.moveTo(p[0], p[1]);
      } else {
        path.lineTo(p[0], p[1]);
      }
    });

    return path;
  }

  get options() {
    return this._options;
  }

  set options(o: O) {
    this._points = this._pointsCreator(
      this.position.x,
      this.position.y,
      this._dimensions.width,
      this._dimensions.height,
      this.options
    );
    this._options = o;
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

  get points() {
    return this._points;
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
