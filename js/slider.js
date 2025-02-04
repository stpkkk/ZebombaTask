import { domElements } from './domElements.js';

export class Slider {
  constructor(data) {
    this.data = data;
    this.carouselPosition = 0;
    this.friendItemWidth = 60;
    this.visibleSlidesQuantity = 8;
    this.sliderArray = this.createSliderArray();
    this.elements = domElements;
    this.init();
  }

  createSliderArray() {
    const filledFriends = [
      ...this.data.rating.slice(0, 1),
      ...this.data.friends,
    ];

    while (filledFriends.length < 12) {
      filledFriends.push({
        id: `empty-${filledFriends.length}`,
        name: '',
        lastName: '',
        img: './images/empty.png',
        points: '',
      });
    }

    return filledFriends;
  }

  init() {
    this.renderSlider();
    this.addEventListeners();
  }

  renderSlider() {
    this.elements.sliderContainer.innerHTML = this.sliderArray
      .map(
        user => `
        <div class="slider-item">
          <img src="${user.img || './images/empty.png'}" alt="${
          user.name || 'Empty Slot'
        }">
          ${
            user.id.startsWith('empty-') ||
            this.data.friends.some(e => e.id === user.id)
              ? ''
              : `<img class="add-to-friends" src="./images/buttons/plus.png" alt="Add to Friends">`
          }
        </div>
      `
      )
      .join('');
  }

  updateSliderPosition() {
    this.elements.sliderContainer.style.transform = `translateX(-${
      this.carouselPosition * this.friendItemWidth
    }px)`;
  }

  nextSlide() {
    const maxSlides = this.sliderArray.length - this.visibleSlidesQuantity;
    this.carouselPosition = (this.carouselPosition + 1) % (maxSlides + 1);
    this.updateSliderPosition();
  }

  prevSlide() {
    const maxSlides = this.sliderArray.length - this.visibleSlidesQuantity;
    this.carouselPosition =
      (this.carouselPosition - 1 + maxSlides + 1) % (maxSlides + 1);
    this.updateSliderPosition();
  }

  addEventListeners() {
    this.elements.nextButton.addEventListener('click', () => this.nextSlide());
    this.elements.prevButton.addEventListener('click', () => this.prevSlide());
  }
}
