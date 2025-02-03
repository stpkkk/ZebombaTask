import { domElements } from './domElements.js';

export class RatingModal {
  constructor(data) {
    this.data = data;
    this.elements = domElements;
    this.createOverlay();
    this.createModal();
    this.attachEventListeners();
  }

  createOverlay() {
    this.overlay = document.createElement('div');
    this.overlay.classList.add('overlay');
    this.elements.main.appendChild(this.overlay);
  }

  createModal() {
    this.ratingWindow = document.createElement('div');
    this.ratingWindow.classList.add('rating-window');
    this.ratingWindow.innerHTML = `
      <button class="close-button">
        <img src='./images/buttons/close-button.png' alt='close'/>
      </button>
      <h2 class="rating-modal-header">Рейтинг игроков</h2>
      <div class="rating-table-container">
        <table class="rating-table">
          <thead>
            <tr>
              <th>Место</th>
              <th></th>
              <th>Имя Фамилия</th>
              <th>Опыт</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    `;
    this.elements.main.appendChild(this.ratingWindow);
    this.tbody = this.ratingWindow.querySelector('tbody');
  }

  populateTable() {
    let playerPlace = 1;
    const sortedData = this.data.rating.sort((a, b) => b.points - a.points);
    this.tbody.innerHTML = sortedData
      .map(
        player => `
      <tr class="${
        this.data.friends.some(friend => friend.id === player.id)
          ? 'friend-highlight'
          : ''
      }">
        <td>${playerPlace++}</td>
        <td><img class='player-image' width='26' height='26' src='${
          player.img
        }' alt='${player.name}'/></td>
        <td>${player.name} ${player.lastName}</td>
        <td>${player.points}</td>
      </tr>
    `
      )
      .join('');
  }

  toggleRatingWindow() {
    const isActive = this.ratingWindow.classList.contains('active');
    if (isActive) {
      this.ratingWindow.classList.remove('active');
      this.overlay.classList.remove('active');
    } else {
      this.populateTable();
      this.ratingWindow.classList.add('active');
      this.overlay.classList.add('active');
    }
  }

  attachEventListeners() {
    this.elements.ratingButton.addEventListener('click', () =>
      this.toggleRatingWindow()
    );
    this.overlay.addEventListener('click', () => this.toggleRatingWindow());
    this.ratingWindow
      .querySelector('.close-button')
      .addEventListener('click', () => this.toggleRatingWindow());
  }
}
