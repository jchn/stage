import { GroupInterface } from "../Group";
import { DrawableInterface } from "../Drawable";
import { Component } from "./render";
import { JSXNodeType, JSXNodeProps } from "../types";

export type VNodeProps = JSXNodeProps;

export type Element = {
  type: JSXNodeType | VNodeCreator;
  props: VNodeProps;
};

export type VNodeCreator = (props: VNodeProps) => VNode;

export function createElement(
  type: JSXNodeType | VNodeCreator,
  props: JSXNodeProps,
  ...children: VNode[]
): VNode {
  return createVNode({
    type,
    props: { ...props, children }
  });
}

type StageRef = GroupInterface | DrawableInterface;

export type VNode = Element & {
  _parent: VNode | null;
  _children: VNode[] | null;
  _dom: StageRef | null;
  _depth: number;
  _component: typeof Component | null;
};

function createVNode(element: Element): VNode {
  return Object.assign({}, element, {
    _children: null,
    _parent: null,
    _dom: null,
    _component: null,
    _depth: 0
  });
}
