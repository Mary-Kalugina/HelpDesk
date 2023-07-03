export default class Render {
  setTickets(data) {
    let html = "";
    for (let ticket in data) {
      html += `<div class="ticket" id="${ticket.id} data-status="${ticket.status}"> 
      <div class="wrapper">
      <input type="checkbox" class="custom-checkbox" id="checkbox">
      <label for="checkbox"></label>
    <div class="ticket_body">
      <div class="ticketName">${ticket.name}</div>
      <div>${ticket.created}</div>
    </div>
      <div class="ticketBtns">
        <button class="edit_btn button"></button>
        <button class="delete_btn button"></button>
      </div>
      </div>
      <div class="discription hidden"></div>
    </div>`;
    }
    document.querySelector(".tickets_container").append(html);
  }

  discriptionShow(id, discription) {
    let ticket = document.getElementById(id);
    let discriptionDrop = ticket.querySelector(".discription");
    discriptionDrop.textContent = discription;
    discriptionDrop.classList.remove("hidden");
    discriptionDrop.classList.add("open");
  }
}
