import Stage from "./Stage";
import Group from "./Group";
import { createSquare, createEllipse } from "./shapes";
import { createText } from "./Text";

const ctx = document.querySelector("canvas").getContext("2d");
const stage = new Stage(800, 600, ctx);
const group = new Group(250, 0);
const square = createSquare(
  0,
  10,
  { width: 20, height: 20 },
  {
    fillStyle: "blue",
    lineWidth: 2
  }
);
const ellipse = createEllipse(
  100,
  100,
  { width: 50, height: 50 },
  {
    fillStyle: "green"
  }
);

const text = createText(0, 50, { width: 100, height: 100 });
text.text = "hello world!";

stage.add(group);
group.add(square);
group.add(ellipse);
group.add(text);

square.addEventListener("click", () => {
  console.log("clicked the square");
});

ellipse.addEventListener("click", () => {
  console.log("clicked the ellipse");
});

stage.draw();
