import Render from "./Render";
const render = new Render();

export default class Requests {
  constructor() {
    this.editProduct = null;
  }

  getAllTickets() {
    try {
      const response = fetch(
        "http://localhost:7070/tickets?method=allTickets",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = JSON.parse(response.json());
      render.setTickets(data);
    } catch (e) {
      console.error(e);
    }
  }

  getDiscription(e) {
    let ticket = e.target.closest(".ticket");
    let id = ticket.dataset.id;

    try {
      const response = fetch(
        `http://localhost:7070/?method=ticketById&id=<${id}>`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = JSON.parse(response.json());
      render.discriptionShow(id, data);
    } catch (e) {
      console.error(e);
    }
  }

  createTicket(e) {
    const data = new FormData();
    let modal = e.target.closest(".widget_container");
    let name = modal.querySelector(".ticketName");
    let discription = modal.querySelector(".discription");
    let created = this.time();

    data.append("id", null);
    data.append("name", name);
    data.append("status", false);
    data.append("discription", discription);
    data.append("created", created);

    try {
      const response = fetch(`http://localhost:7070/?method=createTicket`, {
        method: "POST",
        body: data,
      });
      this.getAllTickets();
    } catch (e) {
      console.error(e);
    }
  }

  updateTicket(e) {
    const data = new FormData();
    let modal = e.target.closest(".widget_container");
    let id = modal.id;
    let name = modal.querySelector(".ticketName");
    let discription = modal.querySelector(".discription");
    let created = this.time();
    let status = modal.data.status;

    data.append("id", id);
    data.append("name", name);
    data.append("status", status);
    data.append("discription", discription);
    data.append("created", created);

    try {
      const response = fetch(`http://localhost:7070/?method=createTicket`, {
        method: "POST",
        body: data,
      });
      this.getAllTickets();
    } catch (e) {
      console.error(e);
    }
  }

  deleteTicket() {
    let id = this.editProduct.id;
    try {
      const response = fetch(
        `http://localhost:7070/?method=deleteById&id=<${id}>`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      this.getAllTickets();
      this.editProduct = null;
    } catch (e) {
      console.error(e);
    }
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
