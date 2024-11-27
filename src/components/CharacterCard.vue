<script setup lang="ts">
import type { Character } from '../types/character';

defineProps<{
  character: Character;
}>();

const emit = defineEmits<{
  (e: 'click', character: Character): void;
}>();
</script>

<template>
  <div
    class="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-200"
    @click="emit('click', character)"
  >
    <img :src="character.image" :alt="character.name" class="w-full h-48 object-cover">
    <div class="p-4">
      <h2 class="text-xl font-bold mb-2">{{ character.name }}</h2>
      <div class="flex items-center mb-2">
        <span class="inline-block w-2 h-2 rounded-full mr-2"
          :class="{
            'bg-green-500': character.status === 'Alive',
            'bg-red-500': character.status === 'Dead',
            'bg-gray-500': character.status === 'unknown'
          }">
        </span>
        <span>{{ character.status }} - {{ character.species }}</span>
      </div>
      <div class="text-gray-600">
        <p class="text-sm">Last known location:</p>
        <p class="font-medium">{{ character.location.name }}</p>
      </div>
    </div>
  </div>
</template>