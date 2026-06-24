import { initHandlers } from "./handlers/init-delegated-events.js";
import "./styles/style.css";
import { initStartScreen } from "./ui/start-screen.js";

const DOM = {
  container: document.querySelector(".container"),
};

initStartScreen(DOM.container).createStartScreen();
initHandlers(DOM.container);
