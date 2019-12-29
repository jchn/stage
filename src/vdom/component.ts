import { StageItem } from "../types";
import { VNode } from "./createElement";
import { GroupInterface } from "../Group";

interface ComponentInterface {
  vnode: VNode;
  stageItem: StageItem;
}

const renderQueue: ComponentInterface[] = [];

class Component implements ComponentInterface {
  constructor(parent: GroupInterface, vnode: VNode) {
    this._vnode = vnode;
    this._parent = parent;
  }

  private _vnode: VNode = null;
  private _parent: GroupInterface = null;

  private createDomNode() {
    // creates a domnode and attaches it to its parent
  }

  set vnode(n: VNode) {
    this._vnode = n;
  }

  get vnode() {
    return this._vnode;
  }

  get stageItem() {
    return this._stageItem;
  }
}

export default Component;
