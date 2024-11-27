<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CharacterCard from './components/CharacterCard.vue';
import CharacterProfile from './components/CharacterProfile.vue';
import SearchBar from './components/SearchBar.vue';
import { searchCharacters } from './services/api';
import type { Character } from './types/character';

const characters = ref<Character[]>([]);
const loading = ref(false);
const selectedCharacter = ref<Character | null>(null);

const fetchCharacters = async (query: string = '') => {
  loading.value = true;
  try {
    const response = await searchCharacters(query);
    characters.value = response.results.slice(0, 10);
  } catch (error) {
    console.error('Error:', error);
    characters.value = [];
  } finally {
    loading.value = false;
  }
};

const handleSearch = (query: string) => {
  fetchCharacters(query);
};

const handleCharacterClick = (character: Character) => {
  selectedCharacter.value = character;
};

const closeProfile = () => {
  selectedCharacter.value = null;
};

onMounted(() => {
  fetchCharacters();
});
</script>

<template>
  <div class="min-h-screen bg-gray-100 py-8 px-4">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-4xl font-bold text-center mb-8">Rick and Morty Characters</h1>
      <SearchBar @search="handleSearch" />
      
      <div v-if="loading" class="text-center">
        <p class="text-xl">Loading...</p>
      </div>
      
      <div v-else-if="characters.length === 0" class="text-center">
        <p class="text-xl">No characters found</p>
      </div>
      
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CharacterCard
          v-for="character in characters"
          :key="character.id"
          :character="character"
          @click="handleCharacterClick"
        />
      </div>
    </div>

    <CharacterProfile
      v-if="selectedCharacter"
      :character-id="selectedCharacter.id"
      @close="closeProfile"
    />
  </div>
</template>