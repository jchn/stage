import Stage from "./Stage";
import Group from "./Group";
import { createSquare } from "./shapes";

const ctx = document.querySelector("canvas").getContext("2d");

const stage = new Stage(800, 600, ctx);
const group = new Group(250, 0);

const square = createSquare(0, 10, { width: 20, height: 20 });

stage.add(group);
group.add(square);

square.addEventListener("click", () => {
  console.log("clicked the square");
});

stage.draw();
