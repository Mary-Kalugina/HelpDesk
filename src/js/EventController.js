import WidgetControl from "./WidgetControl";
import Requests from "./Requests";
const widgetControl = new WidgetControl();
const requests = new Requests();

export default class EventController {
  checkButton(e) {
    if (e.target.classList.contains("ticket_body")) {
      requests.getDiscription(e);
    }
    if (e.target.classList.contains("delete_ticket")) {
      widgetControl.widgetClose();
      requests.deleteTicket();
    }
    if (e.target.classList.contains("add_new_btn")) {
      if (!this.newWidgetOpen()) {
        widgetControl.newWidgetOpen();
      }
    } else if (e.target.classList.contains("delete_btn")) {
      if (!this.newWidgetOpen()) {
        widgetControl.deleteWidgetOpen();
        requests.setEditProduct(e);
      }
    } else if (e.target.classList.contains("edit_btn")) {
      if (!this.newWidgetOpen()) {
        widgetControl.editWidgetOpen(e);
        requests.setEditProduct(e);
      }
    } else if (e.target.classList.contains("close_widget")) {
      widgetControl.widgetClose();
    } else if (e.target.classList.contains("save_widget")) {
      requests.createTicket(e);
    } else if (e.target.classList.contains("edit_widget")) {
      requests.updateTicket(e);
    }
  }
  newWidgetOpen() {
    if (document.querySelector(".widget_container")) {
      return true;
    }
  }
}
