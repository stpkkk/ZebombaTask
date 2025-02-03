import { domElements } from './domElements.js';

export class Slider {
  constructor(data) {
    this.data = data;
    this.sliderArray = this.initializeSliderArray();
    this.carouselPosition = 0;
    this.friendItemWidth = 60;
    this.visibleSlidesQuantity = 8;
    this.elements = domElements;
    this.init();
  }

  initializeSliderArray() {
    return [...this.data.rating.slice(0, 1), ...this.data.friends].concat(
      Array.from({ length: 12 - this.data.friends.length - 1 }, (_, i) => ({
        id: `empty-${i}`,
        name: '',
        lastName: '',
        img: './images/empty.png',
        points: '',
      }))
    );
  }

  init() {
    this.renderSlider();
    this.addEventListeners();
  }

  renderSlider() {
    this.elements.sliderContainer.innerHTML = this.sliderArray
      .map(
        user => `
      <div class="slide" title="${user.name} ${user.lastName}">
        <img src="${user.img || './images/empty.png'}" alt="${user.name}">
        ${
          user.id &&
          !user.id.startsWith('empty-') &&
          !this.data.friends.some(e => e.id === user.id)
            ? `<img class="add-to-friends" src="./images/buttons/plus.png">`
            : ''
        }
      </div>
    `
      )
      .join('');
  }

  nextSlide() {
    this.carouselPosition =
      (this.carouselPosition + 1) %
      (this.sliderArray.length - this.visibleSlidesQuantity + 1);
    this.updateSliderPosition();
  }

  prevSlide() {
    this.carouselPosition =
      (this.carouselPosition -
        1 +
        this.sliderArray.length -
        this.visibleSlidesQuantity +
        1) %
      (this.sliderArray.length - this.visibleSlidesQuantity + 1);
    this.updateSliderPosition();
  }

  updateSliderPosition() {
    this.elements.sliderContainer.style.transform = `translateX(-${
      this.carouselPosition * this.friendItemWidth
    }px)`;
  }

  addEventListeners() {
    this.elements.nextButton.addEventListener('click', () => this.nextSlide());
    this.elements.prevButton.addEventListener('click', () => this.prevSlide());
  }
}
