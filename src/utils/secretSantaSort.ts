import type { Participant } from '../types/participant';

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function validateAssignments(assignments: Participant[]): boolean {
  return assignments.every((participant) => {
    const assignedTo = assignments.find(p => p.id === participant.assignedTo);
    if (!assignedTo) return false;
    
    // Check if someone is assigned to themselves
    if (participant.id === participant.assignedTo) return false;
    
    // Check excluded participants
    if (participant.excludedParticipants?.includes(participant.assignedTo)) return false;
    
    return true;
  });
}

export function assignSecretSanta(participants: Participant[]): Participant[] {
  let attempts = 0;
  const maxAttempts = 100;
  
  while (attempts < maxAttempts) {
    const shuffled = shuffleArray([...participants]);
    const assigned = shuffled.map((participant, index) => {
      const nextIndex = (index + 1) % shuffled.length;
      return {
        ...participant,
        assignedTo: shuffled[nextIndex].id
      };
    });
    
    if (validateAssignments(assigned)) {
      return assigned;
    }
    
    attempts++;
  }
  
  throw new Error('Could not generate valid Secret Santa assignments');
}