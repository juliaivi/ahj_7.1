import Request from './Request';
import createTickets from './createTickets';

export default class Tickets {
  constructor() {
    this.request = new Request('http://localhost:3000');
    this.root = document.querySelector('.roots');
    this.addBtn = this.root.querySelector('.add__btn');
    this.nameText = this.root.querySelector('.name__text');
    this.popup = this.root.querySelector('.popup');
    this.popupAll = this.root.querySelectorAll('.popup');
    this.delete = this.root.querySelector('.delete');
    this.input = this.popup.querySelector('input');
    this.textarea = this.popup.querySelector('textarea');
    this.form = this.popup.querySelector('form');
    this.btnCancel = this.popup.querySelector('.btn__cancel');
    this.tBody = this.root.querySelector('tbody');
    this.trAll = null;
    this.dataId = null;
    this.status = false;
  }

  init() {
    this.request.allTickets((data) => {
      createTickets(data);
      this.getAllTr();
    });

    this.addBtn.addEventListener('click', (e) => this.addPopup(e));
    this.btnCancel.addEventListener('click', (e) => this.closePopup(e));
    this.delete.addEventListener('click', (e) => this.deletePopup(e));

    this.form.addEventListener('submit', (e) => this.sendPopup(e));
  }

  getAllTr() {
    this.trAll = this.tBody.querySelectorAll('tr');
    this.trAll.forEach((el) => {
      el.addEventListener('click', (e) => this.onMouseDown(e));
    });
  }

  addPopup() { // отобразить форму для заполнения
    this.checkOpenWindow(this.delete);

    if (this.popup.classList.contains('d__none')) {
      const titleAdd = this.popup.querySelector('.title__add');
      if (titleAdd.classList.contains('d__none')) {
        titleAdd.classList.remove('d__none');
      }

      const titleChange = this.popup.querySelector('.title__change'); // надпись 2
      this.checkOpenWindow(titleChange);

      this.popup.classList.remove('d__none');
    } else {
      this.popup.classList.add('d__none');
    }
  }

  closePopup() { // закрыть форму
    this.input.value = '';
    this.textarea.value = '';
    this.popup.classList.add('d__none');
  }

  sendPopup(e) { // отправить на сервер, создание и изменение
    e.preventDefault();
    const elem = e.target;
    const formPopup = elem.closest('.form__popup');
    const title = formPopup.querySelector('.title');
    if (title.classList.contains('d__none')) { // определяем добавление или реактиролвание
      const element = document.querySelector(`tr[data-id="${this.dataId}"]`);
      if (element) {
        this.request.editTicket(this.dataId, this.input.value, this.textarea.value);
      }
    } else {
      this.request.addTicket(this.input.value, this.textarea.value);
    }
    this.request.allTickets((data) => {
      createTickets(data);
      this.getAllTr();
    });

    this.dataId = null; // очистить и закрыть форму
    this.closePopup(e);
  }

  onMouseDown(e) { // действия по форме
    const tr = e.target.closest('tr');
    this.dataId = tr.getAttribute('data-id');

    const nameTitle = tr.querySelector('.name__title').textContent;
    const valueNameText = tr.querySelector('.name__text').textContent;

    if (e.target.classList.contains('circle')) { // статус активный
      e.target.classList.toggle('active');
      if (e.target.classList.contains('active')) {
        this.status = true;
      } else {
        this.status = false;
      }
      this.request.toggleStatus(this.dataId, this.status); // отсылаем запрос по статусу
    }
    // изменение
    if (e.target.classList.contains('btn__img') || e.target.classList.contains('btn__edit')) {
      e.target.closest('.btn__edit');
      this.checkOpenWindow(this.delete);

      // Меняем загаловок формы с добавления на изменение
      if (this.popup.classList.contains('d__none')) {
        const titleAdd = this.popup.querySelector('.title__add');
        this.checkOpenWindow(titleAdd);

        const titleChange = this.popup.querySelector('.title__change');
        if (titleChange.classList.contains('d__none')) {
          titleChange.classList.remove('d__none');
        }

        this.input.value = nameTitle;
        this.textarea.value = valueNameText;
        this.popup.classList.remove('d__none');
      } else {
        this.popup.classList.add('d__none');
      }
    }

    if (e.target.classList.contains('btn__delete')) { // удаление, показываение рорup
      this.checkOpenWindow(this.popup);

      if (this.delete.classList.contains('d__none')) {
        this.delete.classList.remove('d__none');
      } else {
        this.delete.classList.add('d__none');
      }
    }

    if (e.target.classList.contains('name__title')) {
      this.nameText = e.target.closest('.name').querySelector('.name__text');
      if (this.nameText) {
        this.nameText.classList.toggle('d__none');
      }
      this.request.ticketDescription(this.dataId);
    }
  }

  deletePopup(e) { // удаление рорup
    if (e.target.classList.contains('btn__cancel')) {
      this.delete.classList.add('d__none');
    }

    if (e.target.classList.contains('btn__save')) { // удаление элемента
      this.request.deleteTicket(this.dataId);
      this.delete.classList.add('d__none');
    }

    setTimeout(() => {
      this.request.allTickets((data) => {
        createTickets(data);
        this.getAllTr();
      });
    }, 100);
  }

  checkOpenWindow(el) {
    if (!el.classList.contains('d__none')) {
      el.classList.add('d__none');
    }
  }
}
