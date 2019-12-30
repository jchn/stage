import { VNode } from "./createElement";
import { GroupInterface } from "../Group";
import * as api from "../api";
import {
  JSXShapeNode,
  JSXGroupNode,
  StageItem,
  EventCallback,
  JSXTextNode
} from "../types";
import {
  DrawableInterface,
  PathOwnerInterface,
  StyleableInterface
} from "../Drawable";
import { InteractionHandlerInterface } from "../InteractionHandler";

export function render(parent: GroupInterface, node: VNode): void {
  diff(parent, node, parent.items[0]);
}

function diff(parent: GroupInterface, vnode: VNode, domNode: StageItem) {
  let dom = domNode;
  if (vnode && dom && vnode.type === dom.kind) {
    // apply diff
    updateNode(vnode, dom);
  } else if (vnode && dom && vnode.type !== dom.kind) {
    removeNode(parent, dom);
    createNode(parent, vnode);
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
  // update the domNode
  if (vnode.props.x !== dom.position.x || vnode.props.y !== dom.position.y) {
    dom.position = { x: vnode.props.x, y: vnode.props.y };
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
    let sn = dom as DrawableInterface &
      InteractionHandlerInterface &
      PathOwnerInterface<unknown> &
      StyleableInterface;

    let optionsMutated = false;
    Object.keys(sn.options).forEach(key => {
      if (sn.options[key] !== vnode.props[key]) {
        optionsMutated = true;
      }
    });

    if (optionsMutated) sn.options = vnode.props;

    if (vnode.props.style) sn.style = vnode.props.style;

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

  if (vnode.type === "text") {
    let tn = dom as DrawableInterface;

    if (vnode.props.children[0] !== tn.text) {
      tn.text = vnode.props.children[0];
    }
  }
}

function createNode(parent: GroupInterface, vnode: VNode): StageItem | null {
  let n = null;
  if (vnode.type === "group") {
    n = vnode as JSXGroupNode;
    let gn: DrawableInterface & GroupInterface = api.createGroupNode({
      x: n.props.x,
      y: n.props.y
    });

    parent.add(gn);

    vnode.props.children.forEach(cn => {
      createNode(gn, cn);
    });

    return gn;
  } else if (vnode.type === "shape") {
    n = vnode as JSXShapeNode;
    let sn: DrawableInterface &
      InteractionHandlerInterface = api.createShapeNode(n.props.type, n.props);
    parent.add(sn);
    if (n.props.onClick) {
      sn.addEventListener("click", n.props.onClick);
    }
    return sn;
  } else if (vnode.type === "text") {
    n = vnode as JSXTextNode;
    let tn: DrawableInterface = api.createTextNode(
      n.props.children[0],
      n.props
    );
    parent.add(tn);
    return tn;
  }

  return null;
}

function removeNode(parent: GroupInterface, domNode: StageItem) {
  parent.remove(domNode);
}

function diffEventHandlers(vnode: VNode, domNode: InteractionHandlerInterface) {
  const props = vnode.props;

  const keys = Object.keys(props);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (key.startsWith("on")) {
    }
  }
}
