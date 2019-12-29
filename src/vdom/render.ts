import { VNode } from "./createElement";
import { StageInterface } from "../Stage";
import { GroupInterface } from "../Group";
import * as api from "../api";
import { JSXShapeNode, JSXGroupNode, Interactable } from "../types";
import { DrawableInterface } from "../Drawable";
import { InteractionHandlerInterface } from "../InteractionHandler";

export function render(
  parent: GroupInterface,
  node: VNode,
  isRoot = true
): void {
  if (isRoot) {
    diff(parent, node, parent.items[0]);
  }
}

function diff(
  parent: GroupInterface,
  vnode: VNode,
  domNode: DrawableInterface
) {
  let dom = domNode;
  if (vnode && dom) {
    // apply diff
    if (vnode.type === dom.kind) {
      // update the domNode
      if (
        vnode.props.x !== dom.position.x ||
        vnode.props.y !== dom.position.y
      ) {
        console.log("updated the position of a", dom.kind, "node");
        dom.position = { x: vnode.props.x, y: vnode.props.y };
      }
    }

    if (vnode.type === "group") {
      let gn = dom;
      vnode.props.children.forEach((cn, i) => {
        diff(gn, cn, gn.items[i]);
      });
    }
  } else if (vnode && !dom) {
    // create new domnode
    let n = null;
    if (vnode.type === "group") {
      n = vnode as JSXGroupNode;
      let gn: DrawableInterface & GroupInterface = api.createGroupNode({
        x: n.props.x,
        y: n.props.y
      });

      parent.add(gn);

      return vnode.props.children.forEach(cn => {
        diff(gn, cn, null);
      });
    } else if (vnode.type === "shape") {
      n = vnode as JSXShapeNode;
      let sn: DrawableInterface &
        InteractionHandlerInterface = api.createShapeNode(
        n.props.type,
        n.props
      );
      parent.add(sn);
      if (n.props.onClick) {
        console.log("add click handler");
        sn.addEventListener("click", n.props.onClick);
      }
    }
  } else if (!vnode && dom) {
    // remove node
    parent.remove(dom);
  }

  return domNode;
}
