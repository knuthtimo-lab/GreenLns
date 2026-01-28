
export interface CareInfo {
  waterIntervalDays: number;
  light: string;
  temp: string;
}

export interface Plant {
  id: string;
  name: string;
  botanicalName: string;
  imageUri: string;
  dateAdded: string; // Serialized Date
  careInfo: CareInfo;
  lastWatered: string; // Serialized Date
  wateringHistory?: string[]; // Array of serialized dates
  description?: string;
  notificationsEnabled?: boolean;
}

export interface IdentificationResult {
  name: string;
  botanicalName: string;
  confidence: number;
  careInfo: CareInfo;
  description?: string;
}

export enum Tab {
  HOME = 'home',
  SEARCH = 'search',
  SETTINGS = 'settings',
}

export type Language = 'de' | 'en' | 'es';
