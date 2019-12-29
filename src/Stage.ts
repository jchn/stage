import { StageItem } from "./types";
import { GroupInterface } from "./Group";

class Stage implements GroupInterface {
  kind: import("./Drawable").DrawableKind;
  constructor(width: number, height: number, ctx: CanvasRenderingContext2D) {
    this.width = width;
    this.height = height;
    this.ctx = ctx;
  }

  private width: number;
  private height: number;
  private ctx: CanvasRenderingContext2D;
  private _items: StageItem[] = [];

  get parent() {
    return this;
  }

  get context() {
    return this.ctx;
  }

  get items() {
    return this._items;
  }

  get position() {
    return { x: 0, y: 0 };
  }

  add(item: StageItem) {
    item.context = this.ctx;

    if (item.parent) {
      item.parent.remove(item);
    }

    item.parent = this;
    this._items.push(item);
  }

  remove(item: StageItem) {
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

export function createStage(
  width: number,
  height: number,
  ctx: CanvasRenderingContext2D
) {
  return new Stage(width, height, ctx);
}

export default Stage;
