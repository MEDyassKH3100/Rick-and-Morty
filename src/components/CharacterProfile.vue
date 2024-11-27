<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import type { Character } from '../types/character';

const props = defineProps<{
  characterId: number;
  onClose: () => void;
}>();

const character = ref<Character | null>(null);
const loading = ref(true);

const fetchCharacterDetails = async () => {
  try {
    const response = await axios.get(`https://rickandmortyapi.com/api/character/${props.characterId}`);
    character.value = response.data;
  } catch (error) {
    console.error('Error fetching character details:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchCharacterDetails();
});
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <div class="flex justify-end">
          <button
            @click="onClose"
            class="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div v-if="loading" class="text-center py-8">
          <p class="text-xl">Loading...</p>
        </div>

        <div v-else-if="character" class="space-y-6">
          <div class="flex flex-col md:flex-row gap-6">
            <img
              :src="character.image"
              :alt="character.name"
              class="w-full md:w-1/2 rounded-lg"
            >
            <div class="space-y-4">
              <h2 class="text-3xl font-bold">{{ character.name }}</h2>
              <div class="flex items-center">
                <span
                  class="inline-block w-3 h-3 rounded-full mr-2"
                  :class="{
                    'bg-green-500': character.status === 'Alive',
                    'bg-red-500': character.status === 'Dead',
                    'bg-gray-500': character.status === 'unknown'
                  }"
                ></span>
                <span class="text-lg">{{ character.status }} - {{ character.species }}</span>
              </div>
              <div class="space-y-2">
                <p class="text-gray-600">Gender: <span class="font-medium">{{ character.gender }}</span></p>
                <div>
                  <p class="text-gray-600">Last known location:</p>
                  <p class="font-medium">{{ character.location.name }}</p>
                </div>
                <div>
                  <p class="text-gray-600">Origin:</p>
                  <p class="font-medium">{{ character.origin?.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-8">
          <p class="text-xl">Character not found</p>
        </div>
      </div>
    </div>
  </div>
</template>