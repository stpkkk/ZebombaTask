'use strict';

const character = document.querySelector('.character');
const moveButton = document.querySelector('.moveButton');

class CharacterController {
  constructor(characterElement, totalSteps) {
    this.character = characterElement;
    this.totalSteps = totalSteps;
    this.currentLocation = new Array(totalSteps).fill(0);
    this.currentLocation[0] = 1;
  }

  moveToNextPoint() {
    const currentPosition = this.currentLocation.indexOf(1);

    if (currentPosition === -1) return;

    if (currentPosition >= this.totalSteps - 1) {
      this.resetPosition();
      return;
    }

    this.updatePosition(currentPosition, currentPosition + 1);
    this.updateCharacterClass(currentPosition + 1);
  }

  resetPosition() {
    this.updatePosition(this.currentLocation.indexOf(1), 0);
    this.updateCharacterClass(0);
  }

  updatePosition(from, to) {
    this.currentLocation[from] = 0;
    this.currentLocation[to] = 1;
  }

  updateCharacterClass(step) {
    this.character.className = `character step-${step}`;
  }
}

const characterController = new CharacterController(character, 11);

moveButton.addEventListener('click', () =>
  characterController.moveToNextPoint()
);
