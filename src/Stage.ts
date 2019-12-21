import { DrawableInterface } from "./Drawable";
import { Pos } from "./types";

export interface StageInterface {
  add: (item: DrawableInterface) => void;
  remove: (item: DrawableInterface) => void;
  items: DrawableInterface[];
  draw: () => void;
  empty: () => void;
  position: Pos;
}

class Stage implements StageInterface {
  constructor(width: number, height: number, ctx: CanvasRenderingContext2D) {
    this.width = width;
    this.height = height;
    this.ctx = ctx;
  }

  private width: number;
  private height: number;
  private ctx: CanvasRenderingContext2D;
  private _items: DrawableInterface[] = [];

  get items() {
    return this._items;
  }

  get position() {
    return { x: 0, y: 0 };
  }

  add(item: DrawableInterface) {
    item.context = this.ctx;
    item.parent = this;
    this._items.push(item);
  }

  remove(item: DrawableInterface) {
    const index = this._items.indexOf(item);
    if (index > -1) {
      this._items.splice(index, 1);
    }
  }

  empty() {
    this._items.splice(0, this._items.length);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this._items.forEach(item => item.draw());
  }
}

export default Stage;
