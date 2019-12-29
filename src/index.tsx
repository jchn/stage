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

const shapes: ShapeType[] = [
  "ellipse",
  "rectangle",
  "ellipse",
  "rectangle",
  "ellipse",
  "rectangle"
];

const createVNode = function(t) {
  return (
    <group x={0} y={0}>
      {shapes.map((shape, i) => (
        <shape
          type={shape}
          x={t * 0.01 + i * 5}
          y={t * 0.01 + i * 5}
          width={5}
          height={5}
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

// loop(0);
// loop(10);
// loop(20);
// loop(30);
// loop(40);
// loop(50);
// loop(60);

console.log("stage", stage);
