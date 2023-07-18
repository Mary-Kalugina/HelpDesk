import EventController from "./EventController";
import Requests from "./Requests";
const eventController = new EventController();
const requests = new Requests();

document.addEventListener("click", (e) => {
  if (e.target.closest(".click")) {
    eventController.checkButton(e);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  requests.getAllTickets();
});
