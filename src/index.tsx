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
      onClick={() => {
        console.log("clicked the ellipse");
      }}
    />
    <shape
      type="rectangle"
      x={100}
      y={100}
      width={10}
      height={10}
      style={{ lineWidth: 5, fillStyle: "orange" }}
      onClick={() => {
        console.log("clicked the rectangle");
      }}
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
