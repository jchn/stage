import { DrawableInterface } from "./Drawable";
import { GroupInterface } from "./Group";
import { StageInterface } from "./Stage";

type MouseEventTypes =
  | "click"
  | "mousedown"
  | "mouseup"
  | "mousemove"
  | "dblclick";
export type EventType = MouseEventTypes;
type EventCallback = (e: MouseEvent, target: DrawableInterface) => void;

export type Pos = {
  x: number;
  y: number;
};

type Interactable = {
  addEventListener: (type: EventType) => void;
  removeEventListener: (type: EventType, cb: EventCallback) => void;
};

type Parent = GroupInterface | StageInterface;
