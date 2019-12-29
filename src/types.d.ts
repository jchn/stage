import { DrawableInterface } from "./Drawable";
import { GroupInterface } from "./Group";
import { StageInterface } from "./Stage";
import { RectangleOptions, EllipseOptions } from "./shapes";
import { VNode } from "./vdom/createElement";
import { InteractionHandlerInterface } from "./InteractionHandler";

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

export type Dimensions = {
  width: number;
  height: number;
};

type Interactable = {
  addEventListener: (type: EventType) => void;
  removeEventListener: (type: EventType, cb: EventCallback) => void;
};

type Parent = GroupInterface | StageInterface;

type StageItem =
  | InteractionHandlerInterface & DrawableInterface
  | GroupInterface;

export type Style = {
  fillStyle?: string | CanvasGradient | CanvasPattern;
  strokeStyle?: string | CanvasGradient | CanvasPattern;
  lineWidth?: number;
  lineCap?: "butt" | "round" | "square";
  shadowColor?: "string";
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  lineDash?: number[];
  lineDashOffset?: number;
  lineJoin?: "bevel" | "round" | "miter";
  miterLimit?: number;
  globalAlpha?: number;
  filter?: string;
  imageSmoothingEnabled?: boolean;
  imageSmoothingQuality?: "low" | "medium" | "high";
  globalCompositeOperation?:
    | "source-in"
    | "source-out"
    | "source-atop"
    | "destination-over"
    | "destination-in"
    | "destination-out"
    | "destination-atop"
    | "lighter"
    | "copy"
    | "xor"
    | "multiply"
    | "screen"
    | "overlay"
    | "darken"
    | "lighten"
    | "color-dodge"
    | "color-burn"
    | "hard-light"
    | "soft-light"
    | "difference"
    | "exclusion"
    | "bue"
    | "saturation"
    | "color"
    | "luminosity";
};

export type TextStyle = Pick<
  Style,
  | "fillStyle"
  | "shadowColor"
  | "shadowBlur"
  | "shadowOffsetX"
  | "shadowOffsetY"
  | "globalAlpha"
  | "globalCompositeOperation"
  | "filter"
> & {
  fontSize: number;
  fontFamily: string;
};

/* vdom */

type EventHandlerProps = { onClick?: EventCallback };

export type JSXNodeType = "group" | "shape";

type JSXNodeProps = Pos & { children: VNode[] | null };

type JSXGroupProps = Pos & {
  children: any[];
};

type JSXShapeProps = Pos &
  EventHandlerProps & {
    style?: Style;
    type: "rectangle" | "ellipse";
  } & (RectangleOptions | EllipseOptions);

type JSXShapeNode = VNode & {
  type: "ellipsis" | "rectangle";
  props: JSXShapeProps;
};

type JSXGroupNode = VNode & {
  type: "group";
  props: JSXGroupProps;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      shape: JSXShapeProps;
      group: JSXGroupProps;
    }
    interface ElementChildrenAttribute {
      children: JSX.IntrinsicElements[];
    }
  }
}
