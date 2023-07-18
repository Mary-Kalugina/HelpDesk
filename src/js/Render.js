export default class Render {
  setTickets(data) {
    let html = "";
    document.querySelector(".tickets_container").innerHTML = "";
    data.forEach((ticket) => {
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
    document
      .querySelector(".tickets_container")
      .insertAdjacentHTML("afterBegin", html);
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
