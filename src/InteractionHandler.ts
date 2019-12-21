import { EventType, EventCallback } from "./types";
import { PathOwner, DrawableInterface } from "./Drawable";

type Subject = PathOwner<unknown> & DrawableInterface;
type EnhancedEventCallback = (e: MouseEvent) => void;

export interface InteractionHandlerInterface {
  addEventListener: (type: EventType, cb: EventCallback) => void;
  removeEventListener: (type: EventType, cb: EventCallback) => void;
  removeAllEventListeners: () => void;
}

class InteractionHandler implements InteractionHandlerInterface {
  constructor(subject: Subject) {
    this._handlers = {
      click: new Map(),
      mousedown: new Map(),
      mouseup: new Map(),
      dblclick: new Map(),
      mousemove: new Map()
    };
    this._subject = subject;
  }

  private _handlers: {
    [key in EventType]: Map<EventCallback, EnhancedEventCallback>
  };

  private _subject: Subject;

  private createEventCallbackHandler(cb: EventCallback): EnhancedEventCallback {
    const subject = this._subject;
    return function(e: MouseEvent) {
      const ctx = subject.context;
      const path = subject.path;
      if (ctx.isPointInPath(path, e.offsetX, e.offsetY)) {
        cb(e, this._subject);
      }
    };
  }

  public addEventListener(type: EventType, cb: EventCallback) {
    const ctx = this._subject.context;
    const handler = this.createEventCallbackHandler(cb);
    ctx.canvas.addEventListener(type, handler);
    this._handlers[type].set(cb, handler);
  }

  public removeEventListener(type: EventType, cb: EventCallback) {
    const ctx = this._subject.context;
    const handler = this._handlers[type].get(cb);
    if (handler) ctx.canvas.removeEventListener(type, handler);
    this._handlers[type].delete(cb);
  }

  public removeAllEventListeners() {
    const ctx = this._subject.context;
    for (let key in this._handlers) {
      const evtType = key as EventType;
      const handlerMap = this._handlers[evtType];
      handlerMap.forEach(cb => {
        ctx.canvas.removeEventListener(evtType, cb);
      });
      handlerMap.clear();
    }
  }
}

export default InteractionHandler;
