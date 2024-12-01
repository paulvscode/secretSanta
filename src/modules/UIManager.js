export class UIManager {
  constructor() {
    this.participantsGrid = document.getElementById('participants-grid');
    this.noParticipants = document.getElementById('no-participants');
    this.generateButton = document.getElementById('generate-button');
    this.results = document.getElementById('results');
    this.assignmentsGrid = document.getElementById('assignments-grid');
    this.formError = document.getElementById('form-error');
    this.error = document.getElementById('error');
  }

  getFormData() {
    return {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      budget: document.getElementById('budget').value
    };
  }

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validateParticipant({ name, email }) {
    if (!name.trim()) {
      return "Name is required";
    }
    if (!email.trim()) {
      return "Email is required";
    }
    if (!this.validateEmail(email)) {
      return "Please enter a valid email address";
    }
    return null;
  }

  clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('budget').value = '20';
    this.showFormError('');
  }

  showFormError(message) {
    this.formError.textContent = message;
  }

  showError(message) {
    this.error.textContent = message;
  }

  updateGenerateButton(participantCount) {
    this.generateButton.disabled = participantCount < 3;
  }

  updateParticipantList(participants) {
    this.participantsGrid.innerHTML = '';
    this.noParticipants.style.display = participants.length ? 'none' : 'block';
    
    participants.forEach(participant => {
      const card = document.createElement('div');
      card.className = 'participant-card';
      card.innerHTML = `
        <div class="participant-header">
          <h3>${participant.name}</h3>
          <button class="remove-button" title="Remove participant">×</button>
        </div>
        <div class="participant-details">
          <p class="email">${participant.email}</p>
          <p class="budget">Budget: €${participant.budget}</p>
        </div>
      `;
      
      this.participantsGrid.appendChild(card);
    });
  }

  displayAssignments(assignments) {
    this.results.classList.remove('hidden');
    this.assignmentsGrid.innerHTML = '';
    
    assignments.forEach(participant => {
      const assignedTo = assignments.find(p => p.id === participant.assignedTo);
      const card = document.createElement('div');
      card.className = 'assignment-card';
      
      card.innerHTML = `
        <div class="card-front">
          <h3>${participant.name}</h3>
          <p class="email">${participant.email}</p>
          <p class="budget">Budget: €${participant.budget}</p>
        </div>
        <div class="card-back">
          <h3>Gives a gift to:</h3>
          <div class="recipient-info">
            <h4>${assignedTo.name}</h4>
            <p>${assignedTo.email}</p>
          </div>
        </div>
      `;
      
      this.assignmentsGrid.appendChild(card);
    });
  }

  toggleAllAssignments() {
    const cards = document.querySelectorAll('.assignment-card');
    const button = document.getElementById('reveal-all-button');
    const isRevealing = !cards[0]?.classList.contains('revealed');
    
    cards.forEach(card => {
      if (isRevealing) {
        card.classList.add('revealed');
      } else {
        card.classList.remove('revealed');
      }
    });
    
    button.textContent = isRevealing ? 'Hide All Assignments' : 'Reveal All Assignments';
  }
}