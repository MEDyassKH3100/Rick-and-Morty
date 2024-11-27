<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  (e: 'search', query: string): void;
}>();

const searchQuery = ref('');

const handleSearch = () => {
  emit('search', searchQuery.value);
};
</script>

<template>
  <div class="mb-8">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search characters..."
      class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      @input="handleSearch"
    >
  </div>
</template>