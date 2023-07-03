import "./css/style.css";
import "./js/Render";
import "./js/WidgetControl";
import EventController from "./js/EventController";
import Requests from "./js/Requests";
const eventController = new EventController();
const requests = new Requests();

document.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("button")) {
    eventController.checkButton(e);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  requests.getAllTickets();
});
