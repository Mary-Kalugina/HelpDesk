import Render from "./Render";

export default class Requests {
  constructor() {
    this.editProduct = null;
    this.render = new Render();
    this.url = "http://localhost:7070/";
  }

  getAllTickets() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", this.url + "?method=allTickets");
    xhr.onreadystatechange = function () {
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

  getDiscription(e) {
    let ticket = e.target.closest(".ticket");
    let id = ticket.dataset.id;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", this.url + `?method=ticketById&id=<${id}>`);
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      if (xhr.status == 200) {
        try {
          const data = JSON.parse(xhr.response);
          this.render.discriptionShow(id, data);
        } catch (e) {
          console.error(e);
        }
      }
    };
    xhr.send();
  }

  createTicket(e) {
    let modal = e.target.closest(".widget_container");
    let name = modal.querySelector(".ticketName");
    let discription = modal.querySelector(".discription");
    let created = this.time();
    const data = JSON.stringify({
      id: null,
      name: name,
      status: false,
      discription: discription,
      created: created,
    });

    const xhr = new XMLHttpRequest();
    xhr.open("POST", this.url + "?method=createTicket");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
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

  updateTicket(e) {
    let modal = e.target.closest(".widget_container");
    let id = modal.id;
    let name = modal.querySelector(".ticketName");
    let discription = modal.querySelector(".discription");
    let created = this.time();
    let status = modal.data.status;
    const data = JSON.stringify({
      id: id,
      name: name,
      status: status,
      discription: discription,
      created: created,
    });

    const xhr = new XMLHttpRequest();
    xhr.open("POST", this.url + `?method=updateById&id=<${id}>`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
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

  deleteTicket() {
    let id = this.editProduct.id;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", this.url + `?method=deleteById&id=<${id}>`);
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
    return (
      new Date().getDate() +
      "." +
      month +
      "." +
      new Date().getFullYear() +
      "   " +
      hours +
      "." +
      new Date().getMinutes()
    );
  }
}
