import "./styles/style.css";
import { createStartScreen } from "./ui/start-screen.js";

const DOM = {
  container: document.querySelector(".container"),
};
createStartScreen(DOM.container);
