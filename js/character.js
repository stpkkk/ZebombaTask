export class CharacterController {
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
