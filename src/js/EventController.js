import WidgetControl from "./WidgetControl";
import Requests from "./Requests";
const widgetControl = new WidgetControl();
const requests = new Requests();

export default class EventController {
  checkButton(e) {
    //при отметке галочки
    console.log(e.target);
    if (e.target.classList.contains("custom-checkbox")) {
      let ticket = e.target.closest(".ticket");
      if (ticket.dataset.status === "true") {
        delete ticket.dataset.status;
        ticket.dataset.status = false;
      } else {
        delete ticket.dataset.status;
        ticket.dataset.status = true;
      }

      requests.updateTicket(e, "checkbox");
    }
    // открываем\закрываем описание
    if (e.target.closest(".ticket_body")) {
      let ticket = e.target.closest(".ticket");
      let descriptionDrop = ticket.querySelector(".description");
      let ev = e;
      if (descriptionDrop.classList.contains("hidden")) {
        requests.getdescription(ev, "show");
        ticket.classList.add("open");
      } else {
        descriptionDrop.classList.add("hidden");
        ticket.classList.remove("open");
      }
    }
    // удалить тикет
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
        requests.getdescription(e, "widget");
        requests.setEditProduct(e);
      }
      //закрыть виджет
    } else if (e.target.classList.contains("close_widget")) {
      widgetControl.widgetClose();
      //сохранить новый тикет
    } else if (e.target.classList.contains("save_widget")) {
      let modal = e.target.closest(".widget_container");
      let value = modal.querySelector(".ticketName").value;
      if (value === "") {
        return;
      }
      requests.createTicket(e);
      widgetControl.widgetClose();
      //сохранить отредактированный тикет
    } else if (e.target.classList.contains("edit_widget")) {
      let modal = e.target.closest(".widget_container");
      let value = modal.querySelector(".ticketName").value;
      if (value === "") {
        return;
      }
      requests.updateTicket(e);
      widgetControl.widgetClose();
    }
  }
  newWidgetOpen() {
    if (document.querySelector(".widget_container")) {
      return true;
    }
  }
}
