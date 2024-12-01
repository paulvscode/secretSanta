export class ParticipantManager {
  constructor() {
    this.participants = [];
  }

  addParticipant({ name, email, budget }) {
    const participant = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email.trim(),
      budget: parseInt(budget, 10)
    };
    
    this.participants.push(participant);
  }

  removeParticipant(id) {
    this.participants = this.participants.filter(p => p.id !== id);
  }

  getParticipants() {
    return [...this.participants];
  }
}