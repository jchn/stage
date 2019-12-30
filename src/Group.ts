import {
  DrawableInterface,
  DrawableKind,
  PointsOwnerInterface
} from "./Drawable";
import { Pos, Parent, StageItem, Point } from "./types";
import { boxFromPoints } from "./utils";

export interface GroupInterface extends DrawableInterface {
  add: (item: DrawableInterface) => void;
  remove: (item: StageItem) => void;
  empty: () => void;
  items: StageItem[];
  position: Pos;
}

class Group implements GroupInterface, PointsOwnerInterface {
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

  get points() {
    return this._items
      .map(item => item.points)
      .reduce((a, b) => a.concat(b), []);
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

  private boundBox(): Point[] {
    return boxFromPoints(this.points);
  }

  public empty() {
    this._items.splice(0, this._items.length);
  }

  public draw() {
    this.items.forEach(item => {
      item.draw();
    });

    const box = this.boundBox();

    box.forEach((p, i) => {
      if (i === 0) {
        this._ctx.moveTo(p[0], p[1]);
      } else {
        this._ctx.lineTo(p[0], p[1]);
      }
    });
    this._ctx.closePath();
    this._ctx.stroke();
  }
}

export function createGroup(x: number, y: number) {
  return new Group(x, y);
}

export default Group;
