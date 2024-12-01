<script setup lang="ts">
import { ref } from 'vue';
import type { Participant } from '../types/participant';

const props = defineProps<{
  assignments: Participant[]
}>();

const showAll = ref(false);

function getAssignedPerson(participant: Participant): Participant | undefined {
  return props.assignments.find(p => p.id === participant.assignedTo);
}
</script>

<template>
  <div class="results" v-if="assignments.length">
    <h2>Secret Santa Assignments</h2>
    <p class="instructions">
      Click on a card to reveal who that person needs to give a gift to!
    </p>
    <button @click="showAll = !showAll" class="reveal-all-button">
      {{ showAll ? 'Hide All Assignments' : 'Reveal All Assignments' }}
    </button>
    <div class="assignments-grid">
      <div
        v-for="participant in assignments"
        :key="participant.id"
        class="assignment-card"
        :class="{ revealed: showAll }"
        @click="showAll = true"
      >
        <div class="card-front">
          <h3>{{ participant.name }}</h3>
          <p class="email">{{ participant.email }}</p>
          <p class="budget">Budget: €{{ participant.budget }}</p>
        </div>
        <div class="card-back">
          <h3>Gives a gift to:</h3>
          <div class="recipient-info">
            <h4>{{ getAssignedPerson(participant)?.name }}</h4>
            <p>{{ getAssignedPerson(participant)?.email }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.results {
  margin-top: 2rem;
  padding: 2rem;
  background-color: #f8f8f8;
  border-radius: 8px;
}

h2 {
  color: #42b883;
  text-align: center;
  margin-bottom: 1rem;
}

.instructions {
  text-align: center;
  color: #666;
  margin-bottom: 1rem;
}

.reveal-all-button {
  display: block;
  margin: 1rem auto;
  background-color: #42b883;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
}

.assignments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.assignment-card {
  position: relative;
  height: 200px;
  perspective: 1000px;
  cursor: pointer;
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transition: transform 0.6s;
  padding: 1.5rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-back {
  transform: rotateY(180deg);
  background-color: #42b883;
  color: white;
}

.assignment-card.revealed .card-front {
  transform: rotateY(180deg);
}

.assignment-card.revealed .card-back {
  transform: rotateY(0deg);
}

.recipient-info {
  text-align: center;
}

.email {
  color: #666;
  font-size: 0.9rem;
}

.budget {
  color: #42b883;
  font-weight: bold;
  margin-top: 0.5rem;
}
</style>