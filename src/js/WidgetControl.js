export default class WidgetControl {
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
      <input class="placeholder discription">
    </label>
    <div class="widget_btns">
      <button type="submit" class="widget_btn save_widget button">Сохранить</button>
      <button type="button" class="widget_btn close_widget button">Отмена</button>
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

  editWidgetOpen(e) {
    let ticket = e.target.closest(".ticket");
    const name = ticket.querySelector(".ticketName").textContent;
    const discription = ticket.querySelector(".discription").textContent;
    const html = `<div class="widget_container">
    <div class="widgetHeader">Изменить тикет</div>
        <form class="widget_form">
        <label>
          Название
          <input class="placeholder ticketName" value="${name}">
        </label>
        <label>
          Описание
          <input class="placeholder discription" value="${discription}">
        </label>
        <div class="widget_btns">
        <button type="submit" class="widget_btn edit_widget button">Сохранить</button>
        <button type="button" class="widget_btn close_widget button">Отмена</button>
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
        <button type="button" class="widget_btn close_widget button">Отмена</button>
        <button type="submit" class="widget_btn delete_ticket button">OK</button>
      </div>
    </div>`;
    const div = document.createElement("div");
    div.innerHTML = html;
    this.body.appendChild(div.firstChild);
  }
}
