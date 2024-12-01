<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  initialWishlist?: string[]
}>();

const emit = defineEmits<{
  (e: 'update:wishlist', wishlist: string[]): void
}>();

const wishlist = ref<string[]>(props.initialWishlist || []);
const newItem = ref('');

function addItem() {
  if (newItem.value.trim()) {
    wishlist.value.push(newItem.value.trim());
    emit('update:wishlist', wishlist.value);
    newItem.value = '';
  }
}

function removeItem(index: number) {
  wishlist.value.splice(index, 1);
  emit('update:wishlist', wishlist.value);
}
</script>

<template>
  <div class="wishlist-input">
    <div class="input-group">
      <input
        v-model="newItem"
        type="text"
        placeholder="Add wishlist item"
        @keyup.enter="addItem"
        class="input"
      />
      <button @click="addItem" class="add-item-button">Add</button>
    </div>
    <ul v-if="wishlist.length" class="wishlist">
      <li v-for="(item, index) in wishlist" :key="index" class="wishlist-item">
        {{ item }}
        <button @click="removeItem(index)" class="remove-item-button">×</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.wishlist-input {
  margin: 1rem 0;
}

.input-group {
  display: flex;
  gap: 0.5rem;
}

.input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.add-item-button {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.wishlist {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}

.wishlist-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background-color: #f5f5f5;
  margin-bottom: 0.5rem;
  border-radius: 4px;
}

.remove-item-button {
  background: none;
  border: none;
  color: #ff4444;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0 0.5rem;
}
</style>