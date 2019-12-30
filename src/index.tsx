import { createElement } from "./vdom/createElement";
import { createStage } from "./Stage";
import { render } from "./vdom/render";
import { ShapeType } from "./api";

function clickHandler() {
  console.log("called clickHandler");
}

const stage = createStage(
  800,
  600,
  document.querySelector("canvas").getContext("2d")
);

const shapes: ShapeType[] = new Array(256).fill(null).map(_ => "rectangle");

const createVNode = function(t) {
  return (
    <group x={t * 0.1} y={t * 0.1}>
      {shapes.map((shape, i) => (
        <shape
          type={shape}
          onClick={clickHandler}
          x={50 + i * 3}
          y={50}
          width={50}
          height={50}
          rotate={t * 0.1 + i * 5}
          anchor={[0.5, 0.5]}
          style={{ lineWidth: 1, fillStyle: "blue" }}
        />
      ))}
    </group>
  );
};

function loop(t) {
  render(stage, createVNode(t));
  stage.draw();
  requestAnimationFrame(loop);
}

loop(0);
// loop(10);
// loop(20);
// loop(30);
// loop(40);
// loop(50);
// loop(60);

console.log("stage", stage);
