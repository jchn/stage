import { DrawableInterface } from "./Drawable";
import { Pos, Parent } from "./types";

export interface GroupInterface {
  add: (item: DrawableInterface) => void;
  remove: (item: DrawableInterface) => void;
  empty: () => void;
  items: DrawableInterface[];
  position: Pos;
}

type GroupOptions = {};

class Group implements GroupInterface, DrawableInterface {
  constructor(x: number, y: number) {
    this.position = { x, y };
  }

  private _position: Pos = { x: 0, y: 0 };
  private _items: DrawableInterface[] = [];
  private _ctx: CanvasRenderingContext2D;
  private _parent: Parent;

  get items() {
    return this._items;
  }

  set context(ctx: CanvasRenderingContext2D) {
    this._ctx = ctx;
  }

  get position() {
    return this._position;
  }

  set position(p: Pos) {
    this._items.forEach(item => {
      item.position = {
        x: item.position.x + p.x,
        y: item.position.y + p.y
      };
    });
    this._position = p;
  }

  get parent() {
    return this._parent;
  }

  set parent(p: Parent) {
    this._parent = p;
  }

  public add(item: DrawableInterface) {
    item.context = this._ctx;
    item.parent = this;
    this._items.push(item);
  }

  public remove(item: DrawableInterface) {
    const index = this._items.indexOf(item);

    if (index > -1) {
      this._items.splice(index, 1);
    }
  }

  public empty() {
    this._items.splice(0, this._items.length);
  }

  public draw() {
    this.items.forEach(item => {
      item.draw();
    });
  }
}

export default Group;
