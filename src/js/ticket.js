export default class Ticket {
  constructor() {
    this.addTicketButton = document.querySelector(".ticket-button");
    this.helpDesk = document.querySelector(".help-desk");
    this.add = document.querySelector(".add");
    this.change = document.querySelector(".change");
    this.delete = document.querySelector(".delete");
    this.deleteButton = this.deleteButton.bind(this);
  }

  deleteButton() {
    const ticketForm = document.querySelector(".ticket-form");
    const cancel = ticketForm.querySelector(".cancel");
    cancel.addEventListener("click", () => {
      ticketForm.remove();
    });
  }

  addTicket() {
    this.addTicketButton.addEventListener("click", () => {
      if (document.querySelector(".ticket-form") != null) return;
      this.helpDesk.insertAdjacentHTML(
        "afterbegin",
        `<div class="ticket-form"><form action="" class="form-container"><h3 class="h3">Добавить тикет</h3><label for="description"><b>Краткое описание</b></label><textarea class="description" type="text" name="description"></textarea><label for="detailed"><b>Подробное описание</b></label><textarea class="detailed" type="text" name="detailed"></textarea><div class="button"><button type="button" class="btn cancel">Отмена</button><button type="submit" class="btn ok">Оk</button></div></form></div>`
      );
      this.deleteButton();
      const buttonOk = document.querySelector(".ok");
      buttonOk.addEventListener("click", (event) => {
        event.preventDefault();
        const description = document.querySelector(".description").value;
        if (description == "") {
          alert("Поле с кратким описанием должно быть заполнено!");
          return;
        }

        const formData = new FormData(
          document.querySelector(".form-container")
        );
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
          if (xhr.readyState !== 4) return;
          const notes = JSON.parse(xhr.responseText);
          const conteiner = document.querySelector(".conteiner");
          conteiner.innerHTML = "";
          for (let index = 0; index < notes.length; index++) {
            const note = notes[index];
            conteiner.insertAdjacentHTML(
              "beforeend",
              `<div class="ticket-conteiner"><label class="ticket-label"><input type="checkbox" class="ticket-check"><div class="checkmark"></div></label><div class="information"><div class="inf">${note.description}</div><div class="details hidden">${note.detailed}</div></div><div class="ticket-date">${note.date}</div><div class="ticket-correct"></div><div class="ticket-delete"></div></div>`
            );
          }
        };
        xhr.open("POST", "http://localhost:7070");
        xhr.send(formData);
        document.querySelector(".ticket-form").remove();
      });
    });
  }

  ticketCorrect() {
    this.helpDesk.addEventListener("click", (e) => {
      if (document.querySelector(".ticket-form") != null) return;
      if (!e.target.classList.contains("ticket-correct")) return;
      e.preventDefault();
      this.helpDesk.insertAdjacentHTML(
        "afterbegin",
        `<div class="ticket-form"><form action="" class="form-container"><h3 class="h3">Изменить тикет</h3><label for="description"><b>Краткое описание</b></label><textarea class="description" type="text" name="description" required>${
          e.target.parentNode.querySelector(".inf").textContent
        }</textarea><label for="detailed"><b>Подробное описание</b></label><textarea class="detailed" type="text" name="detailed">${
          e.target.parentNode.querySelector(".details").textContent
        }</textarea><div class="button"><button type="button" class="btn cancel">Отмена</button><button type="submit" class="btn ok">Оk</button></div></form></div>`
      );
      this.deleteButton();
      const buttonOk = document.querySelector(".ok");
      buttonOk.addEventListener("click", (event) => {
        event.preventDefault();

        const formData = new FormData(
          document.querySelector(".form-container")
        );
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
          if (xhr.readyState !== 4) return;
          const notes = JSON.parse(xhr.responseText);
          const conteiner = document.querySelector(".conteiner");
          conteiner.innerHTML = "";
          for (let index = 0; index < notes.length; index++) {
            const note = notes[index];
            conteiner.insertAdjacentHTML(
              "beforeend",
              `<div class="ticket-conteiner"><label class="ticket-label"><input type="checkbox" class="ticket-check"><div class="checkmark"></div></label><div class="information"><div class="inf">${note.description}</div><div class="details hidden">${note.detailed}</div></div><div class="ticket-date">${note.date}</div><div class="ticket-correct"></div><div class="ticket-delete"></div></div>`
            );
          }
        };
        xhr.open("PUT", "http://localhost:7070");
        xhr.setRequestHeader(
          "Content-type",
          "application/x-www-form-urlencoded"
        );
        xhr.send(
          `descriptionNew=${formData.get("description")}` +
            "&" +
            `detailedNew=${formData.get("detailed")}` +
            "&" +
            `descriptionOld=${
              e.target.parentNode.querySelector(".inf").textContent
            }` +
            "&" +
            `detailedOld=${
              e.target.parentNode.querySelector(".details").textContent
            }` +
            "&" +
            `dateOld=${
              e.target.parentNode.querySelector(".ticket-date").textContent
            }`
        );
        document.querySelector(".ticket-form").remove();
      });
    });
  }

  ticketDelete() {
    this.helpDesk.addEventListener("click", (e) => {
      if (document.querySelector(".ticket-form") != null) return;
      if (!e.target.classList.contains("ticket-delete")) return;
      e.preventDefault();
      this.helpDesk.insertAdjacentHTML(
        "afterbegin",
        `<div class="ticket-form"><form action="" class="form-container"><h3 class="h3">Удалить тикет</h3><b>Вы уверены, что хотите удалить тикет? Это действие необратимо.</b><div class="button"><button type="button" class="btn cancel">Отмена</button><button type="submit" class="btn ok">Оk</button></div></form></div>`
      );
      this.deleteButton();
      const buttonOk = document.querySelector(".ok");
      buttonOk.addEventListener("click", (event) => {
        event.preventDefault();

        const actualNote = e.target.parentNode;
        const body =
          `description=${actualNote.querySelector(".inf").textContent}` +
          "&" +
          `detailed=${actualNote.querySelector(".details").textContent}` +
          "&" +
          `date=${actualNote.querySelector(".ticket-date").textContent}`;
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
          if (xhr.readyState !== 4) return;
          console.log(xhr.responseText);
          const notes = JSON.parse(xhr.responseText);
          const conteiner = document.querySelector(".conteiner");
          conteiner.innerHTML = "";
          for (let index = 0; index < notes.length; index++) {
            const note = notes[index];
            conteiner.insertAdjacentHTML(
              "beforeend",
              `<div class="ticket-conteiner"><label class="ticket-label"><input type="checkbox" class="ticket-check"><div class="checkmark"></div></label><div class="information"><div class="inf">${note.description}</div><div class="details hidden">${note.detailed}</div></div><div class="ticket-date">${note.date}</div><div class="ticket-correct"></div><div class="ticket-delete"></div></div>`
            );
          }
        };
        xhr.open("DELETE", "http://localhost:7070/?" + body);
        xhr.setRequestHeader(
          "Content-type",
          "application/x-www-form-urlencoded"
        );
        xhr.send();
        document.querySelector(".ticket-form").remove();
      });
    });
  }

  viewDetails() {
    this.helpDesk.addEventListener("click", (e) => {
      if (!e.target.classList.contains("inf")) return;
      const viewElement = e.target.nextSibling;
      viewElement.classList.toggle("hidden");
    });
  }
}
