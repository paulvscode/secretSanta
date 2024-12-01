<script setup lang="ts">
import type { Participant } from '../types/participant';

defineProps<{
  participants: Participant[]
}>();

defineEmits<{
  (e: 'remove-participant', id: string): void
}>();
</script>

<template>
  <div class="participant-list">
    <h2>Participants</h2>
    <div v-if="participants.length" class="participants-grid">
      <div
        v-for="participant in participants"
        :key="participant.id"
        class="participant-card"
      >
        <div class="participant-header">
          <h3>{{ participant.name }}</h3>
          <button
            @click="$emit('remove-participant', participant.id)"
            class="remove-button"
            title="Remove participant"
          >
            ×
          </button>
        </div>
        <div class="participant-details">
          <p class="email">{{ participant.email }}</p>
          <p class="budget">Budget: €{{ participant.budget }}</p>
        </div>
      </div>
    </div>
    <p v-else class="no-participants">No participants added yet.</p>
  </div>
</template>

<style scoped>
.participant-list {
  margin: 2rem 0;
}

h2 {
  color: #42b883;
  margin-bottom: 1rem;
}

.participants-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.participant-card {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.participant-header {
  background-color: #42b883;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.participant-header h3 {
  margin: 0;
  font-size: 1.2rem;
}

.participant-details {
  padding: 1rem;
}

.email {
  color: #666;
  margin: 0.5rem 0;
}

.budget {
  color: #42b883;
  font-weight: bold;
  margin: 0.5rem 0;
}

.remove-button {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0 0.5rem;
  line-height: 1;
}

.no-participants {
  text-align: center;
  color: #666;
  padding: 2rem;
  background-color: #f5f5f5;
  border-radius: 8px;
}
</style>