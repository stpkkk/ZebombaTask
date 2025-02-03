import { data } from '../data.js';
import { CharacterController } from './character.js';
import { RatingModal } from './rating.js';
import { Slider } from './slider.js';
import { domElements } from './domElements.js';

const characterController = new CharacterController(domElements.character, 11);
new Slider(data);
new RatingModal(data);

domElements.moveButton.addEventListener('click', () =>
  characterController.moveToNextPoint()
);
