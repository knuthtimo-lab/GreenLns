import { Plant, Language } from '../types';

const STORAGE_KEY = 'greenlens_plants';
const LANG_KEY = 'greenlens_language';

export const StorageService = {
  getPlants: (): Plant[] => {
    try {
      const json = localStorage.getItem(STORAGE_KEY);
      return json ? JSON.parse(json) : [];
    } catch (e) {
      console.error('Failed to load plants', e);
      return [];
    }
  },

  savePlant: (plant: Plant): void => {
    const plants = StorageService.getPlants();
    const updatedPlants = [plant, ...plants];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPlants));
  },

  deletePlant: (id: string): void => {
    const plants = StorageService.getPlants();
    const updatedPlants = plants.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPlants));
  },

  updatePlant: (updatedPlant: Plant): void => {
    const plants = StorageService.getPlants();
    const index = plants.findIndex(p => p.id === updatedPlant.id);
    if (index !== -1) {
      plants[index] = updatedPlant;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(plants));
    }
  },

  getLanguage: (): Language => {
    try {
      const lang = localStorage.getItem(LANG_KEY);
      return (lang as Language) || 'de';
    } catch (e) {
      return 'de';
    }
  },

  saveLanguage: (lang: Language): void => {
    localStorage.setItem(LANG_KEY, lang);
  }
};