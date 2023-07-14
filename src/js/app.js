import EventController from "./EventController";
import Requests from "./Requests";
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
