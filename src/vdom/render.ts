import { VNode } from "./createElement";
import { GroupInterface } from "../Group";
import * as api from "../api";
import { JSXShapeNode, JSXGroupNode, StageItem, EventCallback } from "../types";
import { DrawableInterface } from "../Drawable";
import { InteractionHandlerInterface } from "../InteractionHandler";

export function render(parent: GroupInterface, node: VNode): void {
  diff(parent, node, parent.items[0]);
}

function diff(parent: GroupInterface, vnode: VNode, domNode: StageItem) {
  let dom = domNode;
  if (vnode && dom) {
    // apply diff
    updateNode(vnode, dom);
  } else if (vnode && !dom) {
    // create new domnode
    createNode(parent, vnode);
  } else if (!vnode && dom) {
    removeNode(parent, dom);
  }
  return domNode;
}

function updateNode(vnode: VNode, domNode: StageItem) {
  const dom = domNode;
  if (vnode.type === dom.kind) {
    // update the domNode
    if (vnode.props.x !== dom.position.x || vnode.props.y !== dom.position.y) {
      dom.position = { x: vnode.props.x, y: vnode.props.y };
    }
  }

  if (
    vnode.type === "shape" &&
    (dom.kind === "rectangle" || dom.kind === "ellipse")
  ) {
    if (vnode.props.x !== dom.position.x || vnode.props.y !== dom.position.y) {
      dom.position = { x: vnode.props.x, y: vnode.props.y };
    }
  }

  if (vnode.type === "group") {
    let gn = dom as GroupInterface;

    // needed to prevent skipping deleted nodes
    const numberofIterations = Math.max(
      vnode.props.children.length,
      gn.items.length
    );

    for (let i = 0; i < numberofIterations; i++) {
      const cn = vnode.props.children[i];
      const domItem = gn.items[i];

      diff(gn, cn, domItem);
    }
  }

  if (vnode.type === "shape") {
    let sn = dom as DrawableInterface & InteractionHandlerInterface;

    const cb: EventCallback = sn.handlers.click.keys().next().value;
    if (vnode.props.onClick) {
      if (vnode.props.onClick !== cb) {
        sn.removeEventListener("click", cb);
        sn.addEventListener("click", vnode.props.onClick);
      }
    }

    if (!vnode.props.onClick && cb) {
      sn.removeEventListener("click", cb);
    }
  }
}

function createNode(parent: GroupInterface, vnode: VNode) {
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
      InteractionHandlerInterface = api.createShapeNode(n.props.type, n.props);
    parent.add(sn);
    if (n.props.onClick) {
      sn.addEventListener("click", n.props.onClick);
    }
  }
}

function removeNode(parent: GroupInterface, domNode: StageItem) {
  parent.remove(domNode);
}
