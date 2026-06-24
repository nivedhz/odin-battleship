import { initHandlers } from "./handlers/init-delegated-events.js";
import "./styles/style.css";
import { initStartScreen } from "./ui/start-screen.js";
import { gameScreen } from "./ui/game-screen.js";

const DOM = {
  container: document.querySelector(".container"),
};

DOM.container.replaceChildren(initStartScreen().createStartScreen());
initHandlers(DOM.container);
