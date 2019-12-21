import { DrawableInterface } from "./Drawable";
import { Pos, Dimensions, Parent, TextStyle } from "./types";
import { applyTextStyle } from "./applyStyle";

class Text implements DrawableInterface {
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    style: TextStyle = null
  ) {
    this._position = { x, y };
    this._dimensions = { width, height };
    this._style = style;
  }

  private _ctx: CanvasRenderingContext2D;
  private _position: Pos;
  private _dimensions: Dimensions;
  private _parent: Parent;
  private _text: string = "";
  private _style: TextStyle | null;

  set context(c: CanvasRenderingContext2D) {
    this._ctx = c;
  }

  get context() {
    return this._ctx;
  }

  set position(p: Pos) {
    this._position = p;
  }

  get position() {
    return this._position;
  }

  get parent() {
    return this._parent;
  }

  set parent(p: Parent) {
    this._parent = p;
  }

  get text() {
    return this._text;
  }

  set text(t: string) {
    this._text = t;
  }

  get style() {
    return this._style;
  }

  set style(s: TextStyle) {
    this._style = s;
  }

  draw() {
    if (this.style) {
      this._ctx.save();
      applyTextStyle(this._ctx, this.style);
    }

    this._ctx.fillText(
      this._text,
      this.position.x,
      this.position.y,
      this._dimensions.width
    );

    if (this.style) {
      this._ctx.restore();
    }
  }
}

type TextOptions = {
  width: number;
  height: number;
};

export function createText(
  x: number,
  y: number,
  { width, height }: TextOptions
) {
  return new Text(x, y, width, height);
}

export default Text;
