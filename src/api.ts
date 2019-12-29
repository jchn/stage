import {
  createRectangle,
  createEllipse,
  RectangleOptions,
  EllipseOptions
} from "./shapes";
import { Pos, Style, TextStyle, Dimensions } from "./types";
import { createText } from "./Text";
import { createGroup, GroupInterface } from "./Group";
import { DrawableInterface, StyleableInterface } from "./Drawable";
import { InteractionHandlerInterface } from "./InteractionHandler";
import { createStage, StageInterface } from "./Stage";

export type ShapeType = "rectangle" | "ellipse";
export type ShapeOptions = Pos &
  (EllipseOptions | RectangleOptions) & { style?: Style };

export function createShapeNode(
  type: ShapeType,
  options: ShapeOptions
): DrawableInterface & InteractionHandlerInterface & StyleableInterface {
  switch (type) {
    case "rectangle":
      return createRectangle(options.x, options.y, options, options.style);
    case "ellipse":
      return createEllipse(options.x, options.y, options, options.style);
    default:
      return createRectangle(options.x, options.y, options, options.style);
  }
}

type TextOptions = Pos &
  Dimensions & {
    style?: TextStyle;
  };

export function createTextNode(
  text: string,
  options: TextOptions
): DrawableInterface & StyleableInterface {
  const textNode = createText(options.x, options.y, options);
  if (options.style) textNode.style = options.style;
  textNode.text = text;
  return textNode;
}

type GroupOptions = Pos;

export function createGroupNode({
  x,
  y
}: GroupOptions): GroupInterface & DrawableInterface {
  return createGroup(x, y);
}

type StageOptions = Dimensions & { ctx: CanvasRenderingContext2D };

export function createStageNode({
  ctx,
  width,
  height
}: StageOptions): StageInterface & GroupInterface {
  return createStage(width, height, ctx);
}
