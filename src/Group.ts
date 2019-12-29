import { DrawableInterface, DrawableKind } from "./Drawable";
import { Pos, Parent, StageItem } from "./types";

export interface GroupInterface extends DrawableInterface {
  add: (item: DrawableInterface) => void;
  remove: (item: StageItem) => void;
  empty: () => void;
  items: StageItem[];
  position: Pos;
}

class Group implements GroupInterface {
  constructor(x: number, y: number) {
    this.position = { x, y };
  }

  private _position: Pos = { x: 0, y: 0 };
  private _items: StageItem[] = [];
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
    this.position = {
      x: this._position.x + p.position.x,
      y: this._position.y + p.position.y
    };
    this._parent = p;
  }

  get kind(): DrawableKind {
    return "group";
  }

  public add(item: StageItem) {
    item.context = this._ctx;

    if (item.parent) {
      item.parent.remove(item);
    }

    item.parent = this;
    this._items.push(item);
  }

  public remove(item: StageItem) {
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

export function createGroup(x: number, y: number) {
  return new Group(x, y);
}

export default Group;
