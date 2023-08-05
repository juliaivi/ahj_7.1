import creatsDate from './creatDate';

export default function createTickets(data) {
  const tbody = document.querySelector('tbody');
  tbody.replaceChildren();
  for (const item of data) {
    const date = creatsDate(item.created);

    let status = false;

    if (item.status) {
      status = 'active';
    }

    const boxText = `
                <tr data-id="${item.id}">
                    <td class="status">
                      <div class="circle ${status}"></div>
                    </td>
                    <td class="name">
                      <p class="name__title">${item.name}</p>
                      <p class="name__text d__none">${item.description}</p>
                    </td>
                    <td class="creat__data">${date}</td>
                    <td class="action__edit">
        
                      <button class="btn__edit">
                        <img class="btn__img">
                      </button>
                      <button class="btn__delete">X</button>
                    </td>
                </tr>
      `;
    tbody.insertAdjacentHTML('beforeend', boxText);
  }
}
