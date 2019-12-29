import { createElement } from "./vdom/createElement";
import { createStage } from "./Stage";
import { render } from "./vdom/render";

const vnode = (
  <group x={0} y={0}>
    <shape
      type="ellipse"
      x={20}
      y={20}
      width={10}
      height={10}
      style={{ fillStyle: "red", filter: "blur(3px)", lineWidth: 3 }}
    />
    <shape
      type="rectangle"
      x={100}
      y={100}
      width={10}
      height={10}
      style={{ lineWidth: 5, fillStyle: "orange" }}
    />
  </group>
);

const stage = createStage(
  800,
  600,
  document.querySelector("canvas").getContext("2d")
);

render(stage, vnode);

stage.draw();
