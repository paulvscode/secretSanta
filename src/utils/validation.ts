export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateParticipant(name: string, email: string): string | null {
  if (!name.trim()) {
    return "Name is required";
  }
  if (!email.trim()) {
    return "Email is required";
  }
  if (!validateEmail(email)) {
    return "Please enter a valid email address";
  }
  return null;
}