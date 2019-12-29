import { DrawableInterface, DrawableKind } from "./Drawable";
import { Pos, Dimensions, Parent, TextStyle } from "./types";
import { applyTextStyle } from "./applyStyle";

function splitTextIntoLines(
  width: number,
  text: string,
  ctx: CanvasRenderingContext2D
): string[] {
  const lines = text
    .split(" ")
    .reduce<string[][]>(
      (lines, word) => {
        const lastLine = lines[lines.length - 1];

        const size = ctx.measureText(lastLine.concat([word]).join(" "));

        if (size.width < width || lastLine.length === 0) {
          lastLine.push(word);
        } else {
          lines.push([word]);
        }
        return lines;
      },
      [[]]
    )
    .map(words => words.join(" "));
  return lines;
}

const defaultTextStyle = {
  fontFamily: "sans-serif",
  fontSize: 16
};

class Text implements DrawableInterface {
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    style: TextStyle = defaultTextStyle
  ) {
    this._position = { x, y };
    this._dimensions = { width, height };
    this._style = style;
    this._fontSize = style.fontSize;
  }

  private _ctx: CanvasRenderingContext2D;
  private _position: Pos;
  private _dimensions: Dimensions;
  private _parent: Parent;
  private _text: string = "";
  private _style: TextStyle | null;
  private _fontSize: number = 16;

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

  get kind(): DrawableKind {
    return "text";
  }

  draw() {
    if (this.style) {
      this._ctx.save();
      applyTextStyle(this._ctx, this.style);
    }

    splitTextIntoLines(this._dimensions.width, this.text, this._ctx).forEach(
      (str, i) => {
        this._ctx.fillText(
          str,
          this.position.x,
          this.position.y + i * this._fontSize,
          this._dimensions.width
        );
      }
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
