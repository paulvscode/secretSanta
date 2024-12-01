<script setup lang="ts">
import { ref } from 'vue';
import type { Participant } from '../types/participant';
import { validateParticipant } from '../utils/validation';

const emit = defineEmits<{
  (e: 'add-participant', participant: Participant): void
}>();

const name = ref('');
const email = ref('');
const budget = ref<number>(20);
const error = ref<string | null>(null);

function handleSubmit() {
  error.value = validateParticipant(name.value, email.value);
  if (error.value) return;
  
  const participant: Participant = {
    id: crypto.randomUUID(),
    name: name.value.trim(),
    email: email.value.trim(),
    budget: budget.value
  };
  
  emit('add-participant', participant);
  name.value = '';
  email.value = '';
  error.value = null;
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="participant-form">
    <div class="form-row">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          id="name"
          v-model="name"
          type="text"
          placeholder="Enter name"
          required
          class="input"
        />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          placeholder="Enter email"
          required
          class="input"
        />
      </div>
      <div class="form-group">
        <label for="budget">Budget (€)</label>
        <input
          id="budget"
          v-model="budget"
          type="number"
          min="0"
          step="5"
          class="input"
        />
      </div>
    </div>
    
    <div v-if="error" class="error-message">{{ error }}</div>
    
    <button type="submit" class="submit-button">Add Participant</button>
  </form>
</template>

<style scoped>
.participant-form {
  background-color: #f8f8f8;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: #666;
}

.input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.error-message {
  color: #ff4444;
  margin: 0.5rem 0;
  font-size: 0.9rem;
}

.submit-button {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  margin-top: 1rem;
}

.submit-button:hover {
  background-color: #3aa876;
}
</style>