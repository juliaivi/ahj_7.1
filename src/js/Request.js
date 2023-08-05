export default class Request {
  constructor(server) {
    this.server = server;
  }

  addTicket(name, description) {
    const formData = {
      name,
      description,
    };

    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      if (xhr.status >= 400) {
        console.error(JSON.parse(xhr.response));
      } else {
        console.log(JSON.parse(xhr.response));
      }
    };

    xhr.onerror = () => {
      console.error(JSON.parse(xhr.response));
    };

    xhr.open('POST', `${this.server}?method=createTicket`);

    xhr.send(JSON.stringify(formData));
  }

  editTicket(id, name, description) {
    const formData = {
      id,
      name,
      description,
    };

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json'; // распарсить ответ (тип ответа)
    xhr.open('POST', `${this.server}?method=updateById&id=${id}`);
    xhr.send(JSON.stringify(formData));

    xhr.onload = () => {
      if (xhr.status >= 400) {
        console.error(xhr.response);
      } else {
        console.log(xhr.response);
      }
    };

    xhr.onerror = () => {
      console.error(xhr.response);
    };
  }

  allTickets(fn) {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', `${this.server}?method=allTickets`);
    xhr.responseType = 'json';
    xhr.send();

    xhr.onload = () => {
      if (xhr.status >= 400) {
        console.error(xhr.response);
      } else {
        fn(xhr.response);
      }
    };

    xhr.onerror = () => {
      console.error(xhr.response);
    };
  }

  // показывание описания
  ticketDescription(id) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${this.server}?method=ticketById&id=${id}`);

    xhr.onload = () => {
      if (xhr.status >= 400) {
        console.error(xhr.response);
      } else {
        console.log(xhr.response);
      }
    };

    xhr.onerror = () => {
      console.error(xhr.response);
    };

    xhr.send();
  }

  toggleStatus(id, status) {
    const formData = {
      id,
      status,
    };

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json'; // распарсить ответ (тип ответа)
    xhr.open('POST', `${this.server}?method=updateById&id=${id}`);
    xhr.send(JSON.stringify(formData));
    xhr.onload = () => {
      if (xhr.status >= 400) {
        console.error(xhr.response);
      } else {
        console.log(xhr.response);
      }
    };

    xhr.onerror = () => {
      console.error(xhr.response);
    };
  }

  deleteTicket(id) {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `${this.server}?method=deleteById&id=${id}`);
    xhr.send();
    xhr.onload = () => {
      if (xhr.status >= 400) {
        console.error(xhr.response);
      } else {
        console.log(xhr.response);
      }
    };

    xhr.onerror = () => {
      console.error(xhr.response);
    };
  }
}
