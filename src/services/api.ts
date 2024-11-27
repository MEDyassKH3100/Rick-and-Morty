import axios from 'axios';
import type { ApiResponse } from '../types/character';

const API_URL = 'https://rickandmortyapi.com/api';

export const searchCharacters = async (name: string = ''): Promise<ApiResponse> => {
  try {
    const response = await axios.get(`${API_URL}/character`, {
      params: { name }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching characters:', error);
    return { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };
  }
};