import { VNode } from "./createElement";
import { StageInterface } from "../Stage";
import { GroupInterface } from "../Group";
import * as api from "../api";
import { JSXShapeNode } from "../types";

export function diff(
  parentDom: (StageInterface | GroupInterface) & { _children?: VNode },
  oldVNode: VNode,
  newVNode: VNode
) {}

export function render(parent: GroupInterface, node: VNode): void {
  let children = [];
  let dom = null;
  if (node.type === "group") {
    children = node._children = node.props.children;
    dom = node._dom = api.createGroupNode({ x: node.props.x, y: node.props.y });

    parent.add(dom);

    children.forEach(cnode => {
      render(dom, cnode);
    });
  } else if (node.type === "shape") {
    const n = node as JSXShapeNode;
    dom = n._dom = api.createShapeNode(n.props.type, n.props);
    parent.add(dom);
  }
}
