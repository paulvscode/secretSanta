import './style.css';
import { ParticipantManager } from './modules/ParticipantManager.js';
import { UIManager } from './modules/UIManager.js';
import { SecretSantaManager } from './modules/SecretSantaManager.js';

// Initialize managers
const participantManager = new ParticipantManager();
const uiManager = new UIManager();
const secretSantaManager = new SecretSantaManager();

// Setup event listeners
document.getElementById('participant-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = uiManager.getFormData();
  const validationError = uiManager.validateParticipant(formData);
  
  if (validationError) {
    uiManager.showFormError(validationError);
    return;
  }
  
  participantManager.addParticipant(formData);
  uiManager.updateParticipantList(participantManager.getParticipants());
  uiManager.clearForm();
  uiManager.updateGenerateButton(participantManager.getParticipants().length);
});

document.getElementById('generate-button').addEventListener('click', () => {
  try {
    const assignments = secretSantaManager.assignSecretSanta(participantManager.getParticipants());
    uiManager.displayAssignments(assignments);
    uiManager.showError('');
  } catch (error) {
    uiManager.showError('Failed to generate assignments. Please try again.');
  }
});

document.getElementById('reveal-all-button').addEventListener('click', () => {
  uiManager.toggleAllAssignments();
});