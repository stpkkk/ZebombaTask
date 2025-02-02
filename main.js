'use strict';

import { data } from './data.js';

class CharacterController {
  constructor(characterElement, totalSteps) {
    this.character = characterElement;
    this.totalSteps = totalSteps;
    this.currentPosition = 0;
  }

  moveToNextPoint() {
    this.currentPosition = (this.currentPosition + 1) % this.totalSteps;
    this.updateCharacterClass();
  }

  updateCharacterClass() {
    this.character.className = `character step-${this.currentPosition}`;
  }
}

class Slider {
  constructor(data) {
    this.data = data;
    this.sliderArray = this.initializeSliderArray();
    this.carouselPosition = 0;
    this.friendItemWidth = 60;
    this.visibleSlidesQuantity = 8;

    this.selectElements();
    this.init();
  }

  selectElements() {
    this.sliderContainer = document.querySelector('.slider');
    this.prevButton = document.querySelector('.slider-control.prev');
    this.nextButton = document.querySelector('.slider-control.next');
  }

  initializeSliderArray() {
    const baseArray = [this.data.rating[0], ...this.data.friends];
    while (baseArray.length < 12) {
      baseArray.push({
        id: `empty-${baseArray.length}`,
        name: '',
        lastName: '',
        img: './images/empty.png',
        points: '',
      });
    }
    return baseArray;
  }

  init() {
    this.renderSlider();
    this.addEventListeners();
  }

  renderSlider() {
    this.sliderContainer.innerHTML = this.sliderArray
      .map(user => this.createSlide(user))
      .join('');
  }

  createSlide(user) {
    return `
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
    `;
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
    this.sliderContainer.style.transform = `translateX(-${
      this.carouselPosition * this.friendItemWidth
    }px)`;
  }

  addEventListeners() {
    this.nextButton.addEventListener('click', () => this.nextSlide());
    this.prevButton.addEventListener('click', () => this.prevSlide());
  }
}

const characterElement = document.querySelector('.character');
const moveButton = document.querySelector('.moveButton');
const characterController = new CharacterController(characterElement, 11);
new Slider(data);

moveButton.addEventListener('click', () =>
  characterController.moveToNextPoint()
);
