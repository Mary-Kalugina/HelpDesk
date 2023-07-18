/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/WidgetControl.js
class WidgetControl {
  constructor() {
    this.body = document.querySelector("body");
  }
  newWidgetOpen() {
    const html = `<div class="widget_container">
    <div class="widgetHeader">Добавить тикет</div>
    <form class="widget_form">
    <label>
      Название
      <input class="placeholder ticketName">
    </label>
    <label>
    Описание
      <input class="placeholder description">
    </label>
    <div class="widget_btns">
      <button type="button" class="widget_btn save_widget button click">Сохранить</button>
      <button type="button" class="widget_btn close_widget button click">Отмена</button>
    </div>
    </form>
    </div>`;
    const div = document.createElement("div");
    div.innerHTML = html;
    this.body.appendChild(div.firstChild);
  }
  widgetClose() {
    document.querySelector(".widget_container").remove();
  }
  editWidgetOpen(e, description) {
    let ticket = e.target.closest(".ticket");
    const name = ticket.querySelector(".ticketName").textContent;
    const status = ticket.dataset.status;
    const id = ticket.id;
    const html = `<div class="widget_container" data-status="${status}" data-id="${id}">
    <div class="widgetHeader">Изменить тикет</div>
        <form class="widget_form">
        <label>
          Название
          <input class="placeholder ticketName" value="${name}">
        </label>
        <label>
          Описание
          <input class="placeholder description" value="${description}">
        </label>
        <div class="widget_btns">
        <button type="button" class="widget_btn edit_widget button click">Сохранить</button>
        <button type="button" class="widget_btn close_widget button click">Отмена</button>
      </div>
        </form>
        </div>`;
    const div = document.createElement("div");
    div.innerHTML = html;
    this.body.appendChild(div.firstChild);
  }
  deleteWidgetOpen() {
    const html = `<div class="widget_container">
       <div class="widgetHeader">Удалить тикет</div>
       <p>Вы уверены, что хотите удалить тикет? Это действоие необратимо</p>
       <div class = "widget_btns">
        <button type="button" class="widget_btn close_widget button click">Отмена</button>
        <button type="button" class="widget_btn delete_ticket button click">OK</button>
      </div>
    </div>`;
    const div = document.createElement("div");
    div.innerHTML = html;
    this.body.appendChild(div.firstChild);
  }
}
;// CONCATENATED MODULE: ./src/js/Render.js
class Render {
  setTickets(data) {
    let html = "";
    document.querySelector(".tickets_container").innerHTML = "";
    data.forEach(ticket => {
      let isChecked = "";
      if (ticket.status !== "false" && ticket.status !== false) {
        isChecked = "checked";
      }
      html += `<div class="ticket" id="${ticket.id}" data-status="${ticket.status}"> 
      <div class="wrapper">
      <input type="checkbox" class="custom-checkbox click" id="checkbox" ${isChecked}>
    <div class="ticket_body click">
      <div class="ticketName">${ticket.name}</div>
      <div class="time">${ticket.created}</div>
    </div>
      <div class="ticketBtns">
        <button class="edit_btn button click"></button>
        <button class="delete_btn button click"></button>
      </div>
      </div>
      <div class="description hidden"></div>
    </div>`;
    });
    document.querySelector(".tickets_container").insertAdjacentHTML("afterBegin", html);
  }
  descriptionShow(description, id) {
    if (description === "") {
      return;
    }
    let ticket = document.getElementById(id);
    let descriptionDrop = ticket.querySelector(".description");
    descriptionDrop.textContent = description;
    descriptionDrop.classList.remove("hidden");
  }
}
;// CONCATENATED MODULE: ./src/js/Requests.js


class Requests {
  constructor() {
    this.editProduct = null;
    this.render = new Render();
    this.url = "https://helpdesk-yzo5.onrender.com/";
    this.widgetControl = new WidgetControl();
  }
  // http://localhost:7070/
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
      created: created
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
      created: created
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
      created: created
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
    return new Date().getDate() + "." + month + "." + new Date().getFullYear() + "   " + hours + "." + minutes;
  }
}
;// CONCATENATED MODULE: ./src/js/EventController.js


const widgetControl = new WidgetControl();
const requests = new Requests();
class EventController {
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
;// CONCATENATED MODULE: ./src/js/app.js


const eventController = new EventController();
const app_requests = new Requests();
document.addEventListener("click", e => {
  if (e.target.closest(".click")) {
    eventController.checkButton(e);
  }
});
document.addEventListener("DOMContentLoaded", () => {
  app_requests.getAllTickets();
});
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;