
import { IdentificationResult, Language } from '../types';

interface DatabaseEntry extends IdentificationResult {
  imageUri: string; // Default image for the lexicon
  categories: string[];
}

const PLANT_DATABASE: Record<Language, DatabaseEntry[]> = {
  de: [
    {
      name: "Monstera",
      botanicalName: "Monstera deliciosa",
      confidence: 1.0,
      careInfo: { waterIntervalDays: 7, light: "Halbschatten", temp: "18-24°C" },
      description: "Die Monstera Deliciosa, auch Fensterblatt genannt, ist bekannt für ihre großen, geteilten Blätter. Sie ist pflegeleicht und reinigt die Luft in Innenräumen effektiv.",
      imageUri: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=400&auto=format&fit=crop",
      categories: ["easy", "low_light", "air_purifier"]
    },
    {
      name: "Birkenfeige",
      botanicalName: "Ficus benjamina",
      confidence: 1.0,
      careInfo: { waterIntervalDays: 5, light: "Hell", temp: "16-24°C" },
      description: "Die Birkenfeige ist eine beliebte Zimmerpflanze mit eleganten, überhängenden Zweigen und glänzenden Blättern. Sie reagiert empfindlich auf Standortwechsel.",
      imageUri: "https://images.unsplash.com/photo-1509223197845-458d87318791?q=80&w=400&auto=format&fit=crop",
      categories: ["tree", "bright_light"]
    },
    {
      name: "Echeveria",
      botanicalName: "Echeveria elegans",
      confidence: 1.0,
      careInfo: { waterIntervalDays: 14, light: "Sonnig", temp: "18-28°C" },
      description: "Diese Sukkulente bildet wunderschöne Rosetten und speichert Wasser in ihren dicken Blättern. Sie ist ideal für sonnige Fensterbänke und sehr pflegeleicht.",
      imageUri: "https://images.unsplash.com/photo-1520302669765-66b37fb890d7?q=80&w=400&auto=format&fit=crop",
      categories: ["succulent", "easy", "small"]
    },
    {
      name: "Bogenhanf",
      botanicalName: "Sansevieria trifasciata",
      confidence: 1.0,
      careInfo: { waterIntervalDays: 21, light: "Schatten bis Sonne", temp: "15-30°C" },
      description: "Der Bogenhanf ist fast unzerstörbar. Er kommt mit wenig Licht und Wasser aus und ist einer der besten Luftreiniger für das Schlafzimmer.",
      imageUri: "https://images.unsplash.com/photo-1620127530668-37c2275ae158?q=80&w=400&auto=format&fit=crop",
      categories: ["succulent", "easy", "low_light", "air_purifier"]
    },
    {
      name: "Echte Aloe",
      botanicalName: "Aloe vera",
      confidence: 1.0,
      careInfo: { waterIntervalDays: 14, light: "Sonnig", temp: "20-30°C" },
      description: "Eine Heilpflanze, deren Gel bei Sonnenbrand hilft. Sie benötigt einen sehr hellen Standort und wenig Wasser.",
      imageUri: "https://images.unsplash.com/photo-1567689265771-828557d4766c?q=80&w=400&auto=format&fit=crop",
      categories: ["succulent", "medicinal", "sun"]
    },
    {
      name: "Grünlilie",
      botanicalName: "Chlorophytum comosum",
      confidence: 1.0,
      careInfo: { waterIntervalDays: 7, light: "Halbschatten", temp: "15-23°C" },
      description: "Die Grünlilie ist extrem anpassungsfähig und bildet schnell Ableger. Sie verzeiht Gießfehler und ist ideal für Anfänger.",
      imageUri: "https://images.unsplash.com/photo-1616766649725-b44c698308eb?q=80&w=400&auto=format&fit=crop",
      categories: ["easy", "hanging", "pet_friendly"]
    },
    {
      name: "Einblatt",
      botanicalName: "Spathiphyllum",
      confidence: 1.0,
      careInfo: { waterIntervalDays: 5, light: "Halbschatten", temp: "18-25°C" },
      description: "Das Einblatt zeigt durch hängende Blätter an, wann es Wasser braucht. Es blüht auch bei weniger Licht wunderschön weiß.",
      imageUri: "https://images.unsplash.com/photo-1610496185876-06835a64627d?q=80&w=400&auto=format&fit=crop",
      categories: ["flowering", "low_light", "air_purifier"]
    },
    {
      name: "Korbmarante",
      botanicalName: "Calathea",
      confidence: 1.0,
      careInfo: { waterIntervalDays: 4, light: "Halbschatten", temp: "18-24°C" },
      description: "Calatheas sind bekannt für ihre gemusterten Blätter, die sich nachts zusammenfalten. Sie benötigen hohe Luftfeuchtigkeit.",
      imageUri: "https://images.unsplash.com/photo-1600869680373-b82fa72f8823?q=80&w=400&auto=format&fit=crop",
      categories: ["patterned", "pet_friendly", "high_humidity"]
    }
  ],
  en: [
    {
      name: "Monstera",
      botanicalName: "Monstera deliciosa",
      confidence: 1.0,
      careInfo: { waterIntervalDays: 7, light: "Partial Shade", temp: "18-24°C" },
      description: "The Monstera Deliciosa, also known as the Swiss Cheese Plant, is known for its large, split leaves. It is easy to care for and effectively purifies indoor air.",
      imageUri: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=400&auto=format&fit=crop",
      categories: ["easy", "low_light", "air_purifier"]
    },
    {
      name: "Weeping Fig",
      botanicalName: "Ficus benjamina",
      confidence: 1.0,
      careInfo: { waterIntervalDays: 5, light: "Bright", temp: "16-24°C" },
      description: "The Weeping Fig is a popular houseplant with elegant, drooping branches and glossy leaves. It is sensitive to changes in location.",
      imageUri: "https://images.unsplash.com/photo-1509223197845-458d87318791?q=80&w=400&auto=format&fit=crop",
      categories: ["tree", "bright_light"]
    },
    {
      name: "Mexican Snowball",
      botanicalName: "Echeveria elegans",
      confidence: 1.0,
      careInfo: { waterIntervalDays: 14, light: "Sunny", temp: "18-28°C" },
      description: "This succulent forms beautiful rosettes and stores water in its thick leaves. It is ideal for sunny windowsills and very low maintenance.",
      imageUri: "https://images.unsplash.com/photo-1520302669765-66b37fb890d7?q=80&w=400&auto=format&fit=crop",
      categories: ["succulent", "easy", "small"]
    },
    {
      name: "Snake Plant",
      botanicalName: "Sansevieria trifasciata",
      confidence: 1.0,
      careInfo: { waterIntervalDays: 21, light: "Shade to Sun", temp: "15-30°C" },
      description: "The Snake Plant is nearly indestructible. It tolerates low light and drought and is one of the best air purifiers for the bedroom.",
      imageUri: "https://images.unsplash.com/photo-1620127530668-37c2275ae158?q=80&w=400&auto=format&fit=crop",
      categories: ["succulent", "easy", "low_light", "air_purifier"]
    },
    {
      name: "Aloe Vera",
      botanicalName: "Aloe vera",
      confidence: 1.0,
      careInfo: { waterIntervalDays: 14, light: "Sunny", temp: "20-30°C" },
      description: "A medicinal plant whose gel helps with sunburn. It requires a very bright spot and little water.",
      imageUri: "https://images.unsplash.com/photo-1567689265771-828557d4766c?q=80&w=400&auto=format&fit=crop",
      categories: ["succulent", "medicinal", "sun"]
    },
    {
      name: "Spider Plant",
      botanicalName: "Chlorophytum comosum",
      confidence: 1.0,
      careInfo: { waterIntervalDays: 7, light: "Partial Shade", temp: "15-23°C" },
      description: "The Spider Plant is extremely adaptable and quickly forms offshoots. It forgives watering mistakes and is ideal for beginners.",
      imageUri: "https://images.unsplash.com/photo-1616766649725-b44c698308eb?q=80&w=400&auto=format&fit=crop",
      categories: ["easy", "hanging", "pet_friendly"]
    },
    {
      name: "Peace Lily",
      botanicalName: "Spathiphyllum",
      confidence: 1.0,
      careInfo: { waterIntervalDays: 5, light: "Partial Shade", temp: "18-25°C" },
      description: "The Peace Lily shows when it needs water by drooping its leaves. It blooms beautifully white even in lower light.",
      imageUri: "https://images.unsplash.com/photo-1610496185876-06835a64627d?q=80&w=400&auto=format&fit=crop",
      categories: ["flowering", "low_light", "air_purifier"]
    },
    {
      name: "Calathea",
      botanicalName: "Calathea",
      confidence: 1.0,
      careInfo: { waterIntervalDays: 4, light: "Partial Shade", temp: "18-24°C" },
      description: "Calatheas are known for their patterned leaves that fold up at night. They require high humidity.",
      imageUri: "https://images.unsplash.com/photo-1600869680373-b82fa72f8823?q=80&w=400&auto=format&fit=crop",
      categories: ["patterned", "pet_friendly", "high_humidity"]
    }
  ],
  es: [
    {
      name: "Costilla de Adán",
      botanicalName: "Monstera deliciosa",
      confidence: 1.0,
      careInfo: { waterIntervalDays: 7, light: "Sombra Parcial", temp: "18-24°C" },
      description: "La Monstera Deliciosa es conocida por sus grandes hojas divididas. Es fácil de cuidar y purifica el aire interior de manera efectiva.",
      imageUri: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=400&auto=format&fit=crop",
      categories: ["easy", "low_light", "air_purifier"]
    },
    {
      name: "Ficus Benjamina",
      botanicalName: "Ficus benjamina",
      confidence: 1.0,
      careInfo: { waterIntervalDays: 5, light: "Brillante", temp: "16-24°C" },
      description: "El Ficus Benjamina es una planta de interior popular con ramas elegantes y caídas y hojas brillantes. Es sensible a los cambios de ubicación.",
      imageUri: "https://images.unsplash.com/photo-1509223197845-458d87318791?q=80&w=400&auto=format&fit=crop",
      categories: ["tree", "bright_light"]
    },
    {
      name: "Rosa de Alabastro",
      botanicalName: "Echeveria elegans",
      confidence: 1.0,
      careInfo: { waterIntervalDays: 14, light: "Soleado", temp: "18-28°C" },
      description: "Esta suculenta forma hermosas rosetas y almacena agua en sus hojas gruesas. Es ideal para alféizares soleados y requiere muy poco mantenimiento.",
      imageUri: "https://images.unsplash.com/photo-1520302669765-66b37fb890d7?q=80&w=400&auto=format&fit=crop",
      categories: ["succulent", "easy", "small"]
    },
    {
      name: "Lengua de Suegra",
      botanicalName: "Sansevieria trifasciata",
      confidence: 1.0,
      careInfo: { waterIntervalDays: 21, light: "Sombra a Sol", temp: "15-30°C" },
      description: "La Sansevieria es casi indestructible. Tolera poca luz y sequía, y es uno de los mejores purificadores de aire para el dormitorio.",
      imageUri: "https://images.unsplash.com/photo-1620127530668-37c2275ae158?q=80&w=400&auto=format&fit=crop",
      categories: ["succulent", "easy", "low_light", "air_purifier"]
    },
    {
      name: "Aloe Vera",
      botanicalName: "Aloe vera",
      confidence: 1.0,
      careInfo: { waterIntervalDays: 14, light: "Soleado", temp: "20-30°C" },
      description: "Una planta medicinal cuyo gel ayuda con las quemaduras solares. Requiere un lugar muy luminoso y poca agua.",
      imageUri: "https://images.unsplash.com/photo-1567689265771-828557d4766c?q=80&w=400&auto=format&fit=crop",
      categories: ["succulent", "medicinal", "sun"]
    },
    {
      name: "Cinta",
      botanicalName: "Chlorophytum comosum",
      confidence: 1.0,
      careInfo: { waterIntervalDays: 7, light: "Sombra Parcial", temp: "15-23°C" },
      description: "La Cinta es extremadamente adaptable y forma retoños rápidamente. Perdona los errores de riego y es ideal para principiantes.",
      imageUri: "https://images.unsplash.com/photo-1616766649725-b44c698308eb?q=80&w=400&auto=format&fit=crop",
      categories: ["easy", "hanging", "pet_friendly"]
    },
    {
      name: "Cuna de Moisés",
      botanicalName: "Spathiphyllum",
      confidence: 1.0,
      careInfo: { waterIntervalDays: 5, light: "Sombra Parcial", temp: "18-25°C" },
      description: "La Cuna de Moisés muestra cuándo necesita agua al dejar caer sus hojas. Florece hermosamente en blanco incluso con poca luz.",
      imageUri: "https://images.unsplash.com/photo-1610496185876-06835a64627d?q=80&w=400&auto=format&fit=crop",
      categories: ["flowering", "low_light", "air_purifier"]
    },
    {
      name: "Calathea",
      botanicalName: "Calathea",
      confidence: 1.0,
      careInfo: { waterIntervalDays: 4, light: "Sombra Parcial", temp: "18-24°C" },
      description: "Las Calatheas son conocidas por sus hojas estampadas que se pliegan por la noche. Requieren alta humedad.",
      imageUri: "https://images.unsplash.com/photo-1600869680373-b82fa72f8823?q=80&w=400&auto=format&fit=crop",
      categories: ["patterned", "pet_friendly", "high_humidity"]
    }
  ]
};

export const PlantDatabaseService = {
  getAllPlants: (lang: Language): DatabaseEntry[] => {
    return PLANT_DATABASE[lang] || PLANT_DATABASE['de'];
  },

  searchPlants: (query: string, lang: Language): DatabaseEntry[] => {
    const plants = PLANT_DATABASE[lang] || PLANT_DATABASE['de'];
    const lowerQuery = query.toLowerCase();
    
    return plants.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) || 
      p.botanicalName.toLowerCase().includes(lowerQuery)
    );
  },
  
  getRandomPlant: (lang: Language): DatabaseEntry => {
     const plants = PLANT_DATABASE[lang] || PLANT_DATABASE['de'];
     return plants[Math.floor(Math.random() * plants.length)];
  }
};
