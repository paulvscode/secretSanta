<script setup lang="ts">
import { ref } from 'vue';
import type { Participant } from './types/participant';
import ParticipantForm from './components/ParticipantForm.vue';
import ParticipantList from './components/ParticipantList.vue';
import Results from './components/Results.vue';
import { assignSecretSanta } from './utils/secretSantaSort';

const participants = ref<Participant[]>([]);
const assignments = ref<Participant[]>([]);
const error = ref<string>('');

function addParticipant(participant: Participant) {
  participants.value.push(participant);
  assignments.value = [];
}

function removeParticipant(id: string) {
  participants.value = participants.value.filter(p => p.id !== id);
  assignments.value = [];
}

function generateAssignments() {
  if (participants.value.length < 3) {
    error.value = 'Please add at least 3 participants';
    return;
  }
  
  try {
    assignments.value = assignSecretSanta(participants.value);
    error.value = '';
  } catch (e) {
    error.value = 'Failed to generate assignments. Please try again.';
  }
}
</script>

<template>
  <div class="container">
    <header>
      <h1>Secret Santa Organizer</h1>
      <p class="subtitle">Organize your holiday gift exchange with ease!</p>
    </header>

    <main>
      <ParticipantForm @add-participant="addParticipant" />
      <ParticipantList
        :participants="participants"
        @remove-participant="removeParticipant"
      />
      
      <div v-if="error" class="error-message">{{ error }}</div>
      
      <button
        @click="generateAssignments"
        class="generate-button"
        :disabled="participants.length < 3"
      >
        Generate Secret Santa Assignments
      </button>
      
      <Results :assignments="assignments" />
    </main>

    <footer>
      <p>Add at least 3 participants to generate Secret Santa assignments</p>
    </footer>
  </div>
</template>

<style>
:root {
  --primary-color: #42b883;
  --primary-dark: #3aa876;
  --error-color: #ff4444;
  --text-color: #2c3e50;
  --background-color: #f8f8f8;
}

body {
  margin: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-color);
  background-color: var(--background-color);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

header {
  text-align: center;
  margin-bottom: 3rem;
}

h1 {
  color: var(--primary-color);
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #666;
  font-size: 1.2rem;
}

.error-message {
  color: var(--error-color);
  text-align: center;
  margin: 1rem 0;
  padding: 0.5rem;
  background-color: rgba(255, 68, 68, 0.1);
  border-radius: 4px;
}

.generate-button {
  width: 100%;
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 1rem;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 1rem;
  transition: background-color 0.2s;
}

.generate-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.generate-button:not(:disabled):hover {
  background-color: var(--primary-dark);
}

footer {
  text-align: center;
  margin-top: 3rem;
  color: #666;
}
</style>