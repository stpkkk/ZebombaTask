'use strict';

class CharacterController {
  constructor(characterElement, totalSteps) {
    this.character = characterElement;
    this.totalSteps = totalSteps;
    this.currentLocation = new Array(totalSteps).fill(0);
    this.currentLocation[0] = 1; // Start at the first position
  }

  moveToNextPoint() {
    const currentPosition = this.currentLocation.indexOf(1);

    if (currentPosition === -1) return; // No active position found

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

// Initialize the character controller
const character = document.querySelector('.character');
const moveButton = document.querySelector('.moveButton');
const characterController = new CharacterController(character, 11);

// Add event listener
moveButton.addEventListener('click', () =>
  characterController.moveToNextPoint()
);
