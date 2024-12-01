export interface Participant {
  id: string;
  name: string;
  email: string;
  assignedTo?: string;
  budget?: number;
  excludedParticipants?: string[];
}