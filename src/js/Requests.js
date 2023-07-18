import Render from "./Render";
import WidgetControl from "./WidgetControl";

export default class Requests {
  constructor() {
    this.editProduct = null;
    this.render = new Render();
    this.url = "http://localhost:7070/";
    this.widgetControl = new WidgetControl();
  }
  // https://helpdesk-yzo5.onrender.com/
  getAllTickets() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", this.url + "?method=allTickets");
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return;
      if (xhr.status == 200) {
        try {
          const data = JSON.parse(xhr.response);
          this.render.setTickets(data);
        } catch (e) {
          console.error(e);
        }
      }
    };
    xhr.send();
  }

  getdescription(e, trem) {
    let ticket = e.target.closest(".ticket");
    let id = ticket.id;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", this.url + `?method=ticketById&id=${id}`);
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return;
      if (xhr.status == 200) {
        try {
          let data = JSON.parse(xhr.response);
          if (trem === "show") {
            this.render.descriptionShow(data.description, data.id);
          } else {
            this.widgetControl.editWidgetOpen(e, data.description);
          }
        } catch (e) {
          console.error(e);
        }
      }
    };
    xhr.send();
  }

  createTicket(e) {
    let modal = e.target.closest(".widget_container");
    let name = modal.querySelector(".ticketName").value;
    let description = modal.querySelector(".description").value;
    let created = this.time();
    const data = JSON.stringify({
      id: null,
      name: name,
      status: false,
      description: description,
      created: created,
    });

    const xhr = new XMLHttpRequest();
    xhr.open("POST", this.url + "?method=createTicket");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return;
      if (xhr.status == 200) {
        try {
          this.getAllTickets();
        } catch (e) {
          console.error(e);
        }
      }
    };
    xhr.send(data);
  }

  updateTicket(e, trem) {
    let data;
    let id;
    if (trem === "checkbox") {
      id = e.target.closest(".ticket").id;
      data = this.configureEditTicketData(e);
    } else {
      let modal = e.target.closest(".widget_container");
      id = modal.dataset.id;
      data = this.configureModalData(e);
    }

    const xhr = new XMLHttpRequest();
    xhr.open("POST", this.url + `?method=updateById&id=${id}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return;
      if (xhr.status == 200) {
        try {
          this.getAllTickets();
        } catch (e) {
          console.error(e);
        }
      }
    };
    xhr.send(data);
  }

  configureEditTicketData(e) {
    let ticket = e.target.closest(".ticket");
    let id = ticket.id;
    let name = ticket.querySelector(".ticketName").value;
    let description = ticket.querySelector(".description").value;
    let created = this.time();
    let status = ticket.dataset.status;
    return JSON.stringify({
      id: id,
      name: name,
      status: status,
      description: description,
      created: created,
    });
  }

  configureModalData(e) {
    let modal = e.target.closest(".widget_container");
    let id = modal.dataset.id;
    let name = modal.querySelector(".ticketName").value;
    let description = modal.querySelector(".description").value;
    let created = this.time();
    let status = modal.dataset.status;
    return JSON.stringify({
      id: id,
      name: name,
      status: status,
      description: description,
      created: created,
    });
  }

  deleteTicket() {
    let id = this.editProduct.id;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", this.url + `?method=deleteById&id=${id}`);
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      if (xhr.status == 200) {
        try {
          this.getAllTickets();
          this.editProduct = null;
        } catch (e) {
          console.error(e);
        }
      }
    };
    xhr.send();

    this.editProduct.remove();
  }

  setEditProduct(e) {
    this.editProduct = e.target.closest(".ticket");
  }

  time() {
    let month = new Date().getMonth();
    if (month.toString().length === 1) {
      month = "0" + month.toString();
    }
    let hours = new Date().getHours();
    if (hours.toString().length === 1) {
      hours = "0" + hours.toString();
    }
    let minutes = new Date().getMinutes();
    if (minutes.toString().length === 1) {
      minutes = "0" + minutes.toString();
    }
    return (
      new Date().getDate() +
      "." +
      month +
      "." +
      new Date().getFullYear() +
      "   " +
      hours +
      "." +
      minutes
    );
  }
}
