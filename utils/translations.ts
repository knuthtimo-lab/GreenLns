
import { Language } from '../types';

export const translations = {
  de: {
    // Tabs
    tabPlants: 'Pflanzen',
    tabSearch: 'Suche',
    tabProfile: 'Profil',
    
    // Headers
    myPlants: 'Meine Pflanzen',
    searchTitle: 'Suche',
    settingsTitle: 'Einstellungen',
    
    // Settings
    darkMode: 'Dark Mode',
    language: 'Sprache',
    
    // Empty States / Info
    noPlants: 'Noch keine Pflanzen.',
    
    // Filters
    allGood: 'Alles gut',
    toWater: 'Zu gießen',
    
    // Search
    searchPlaceholder: 'Pflanzen suchen...',
    categories: 'Kategorien entdecken',
    resultsInPlants: 'Ergebnisse in "Meine Pflanzen"',
    noResults: 'Keine Pflanzen gefunden.',
    
    // Categories
    catCareEasy: "Pflegeleicht",
    catSucculents: "Sukkulenten",
    catLowLight: "Wenig Licht",
    catPetFriendly: "Tierfreundlich",
    catAirPurifier: "Luftreiniger",
    catFlowering: "Blühend",

    // Dictionary
    lexiconTitle: "Pflanzen-Lexikon",
    lexiconDesc: "Durchsuche unsere Datenbank und finde die perfekte Ergänzung für dein Zuhause.",
    lexiconSearchPlaceholder: "Lexikon durchsuchen...",
    browseLexicon: "Im Lexikon stöbern",
    backToSearch: "Zurück zur Suche",

    // Misc
    comingSoon: 'Bald verfügbar',
    gallery: 'Galerie',
    help: 'Hilfe',
    scanner: 'Scanner',
    analyzing: 'Pflanze wird analysiert...',
    localProcessing: "Lokale Verarbeitung",
    
    // Scan Stages
    scanStage1: "Bildqualität wird geprüft...",
    scanStage2: "Blattstrukturen werden analysiert...",
    scanStage3: "Abgleich mit Pflanzendatenbank...",
    
    // Plant Card / Detail / Result
    result: "Ergebnis",
    match: "Übereinstimmung",
    careCheck: "Pflege-Check",
    showDetails: "Details anzeigen",
    hideDetails: "Details verbergen",
    dataSavedLocally: "Daten werden lokal gespeichert",
    addToPlants: "Zu meinen Pflanzen hinzufügen",
    aboutPlant: "Über die Pflanze",
    noDescription: "Keine Beschreibung verfügbar.",
    careTips: "Pflegehinweise",
    addedOn: "Hinzugefügt am",
    plantAddedSuccess: "Pflanze erfolgreich hinzugefügt",
    
    // Detailed Care
    detailedCare: "Detaillierte Pflege",
    careTextWater: "Bodenfeuchtigkeit alle {0} Tage prüfen.",
    careTextLight: "Ideal für Standorte: {0}.",
    careTextTemp: "Wohlfühltemperatur: {0}.",
    
    // Care Attributes
    water: "Gießen",
    light: "Licht",
    temp: "Temperatur",
    
    // Care Values (UI Helper)
    waterModerate: "Mäßig",
    waterLittle: "Wenig",
    waterEveryXDays: "Alle {0} Tage",
    waterToday: "Heute gießen",
    inXDays: "In {0} Tagen",
    nextWatering: "Nächstes Gießen: {0}",
    days: "Tage",

    // Actions
    delete: "Löschen",
    edit: "Bearbeiten",
    share: "Teilen",
    waterNow: "Jetzt gießen",
    watered: "Gegossen",
    wateredSuccess: "Pflanze wurde gegossen!",
    plantDeleted: "Pflanze entfernt.",
    deleteConfirmTitle: "Pflanze löschen?",
    deleteConfirmMessage: "Möchtest du diese Pflanze wirklich aus deiner Sammlung entfernen? Dies kann nicht rückgängig gemacht werden.",
    cancel: "Abbrechen",
    confirm: "Löschen",
    lastWateredDate: "Zuletzt gegossen: {0}",

    // History
    wateringHistory: "Gießhistorie",
    noHistory: "Noch keine Einträge.",

    // Reminder
    reminder: "Erinnerung",
    reminderDesc: "Benachrichtigung am Stichtag",
    reminderOn: "Aktiviert",
    reminderOff: "Deaktiviert",
    reminderPermissionNeeded: "Berechtigung für Benachrichtigungen erforderlich.",
  },
  en: {
    tabPlants: 'Plants',
    tabSearch: 'Search',
    tabProfile: 'Profile',
    myPlants: 'My Plants',
    searchTitle: 'Search',
    settingsTitle: 'Settings',
    darkMode: 'Dark Mode',
    language: 'Language',
    noPlants: 'No plants yet.',
    allGood: 'All good',
    toWater: 'To water',
    searchPlaceholder: 'Search plants...',
    categories: 'Discover Categories',
    resultsInPlants: 'Results in "My Plants"',
    noResults: 'No plants found.',
    
    catCareEasy: "Easy Care",
    catSucculents: "Succulents",
    catLowLight: "Low Light",
    catPetFriendly: "Pet Friendly",
    catAirPurifier: "Air Purifier",
    catFlowering: "Flowering",

    lexiconTitle: "Plant Encyclopedia",
    lexiconDesc: "Browse our database and find the perfect addition for your home.",
    lexiconSearchPlaceholder: "Search encyclopedia...",
    browseLexicon: "Browse Encyclopedia",
    backToSearch: "Back to Search",

    comingSoon: 'Coming Soon',
    gallery: 'Gallery',
    help: 'Help',
    scanner: 'Scanner',
    analyzing: 'Analyzing plant...',
    localProcessing: "Local Processing",

    // Scan Stages
    scanStage1: "Checking image quality...",
    scanStage2: "Analyzing leaf structures...",
    scanStage3: "Matching with plant database...",

    result: "Result",
    match: "Match",
    careCheck: "Care Check",
    showDetails: "Show Details",
    hideDetails: "Hide Details",
    dataSavedLocally: "Data is saved locally",
    addToPlants: "Add to my plants",
    aboutPlant: "About the plant",
    noDescription: "No description available.",
    careTips: "Care Tips",
    addedOn: "Added on",
    plantAddedSuccess: "Plant successfully added",
    
    detailedCare: "Detailed Care",
    careTextWater: "Check soil moisture every {0} days.",
    careTextLight: "Ideal location: {0}.",
    careTextTemp: "Ideal temperature: {0}.",
    
    water: "Water",
    light: "Light",
    temp: "Temperature",
    
    waterModerate: "Moderate",
    waterLittle: "Little",
    waterEveryXDays: "Every {0} days",
    waterToday: "Water today",
    inXDays: "In {0} days",
    nextWatering: "Next watering: {0}",
    days: "Days",

    delete: "Delete",
    edit: "Edit",
    share: "Share",
    waterNow: "Water Now",
    watered: "Watered",
    wateredSuccess: "Plant watered!",
    plantDeleted: "Plant removed.",
    deleteConfirmTitle: "Delete plant?",
    deleteConfirmMessage: "Do you really want to remove this plant from your collection? This cannot be undone.",
    cancel: "Cancel",
    confirm: "Delete",
    lastWateredDate: "Last watered: {0}",

    // History
    wateringHistory: "Watering History",
    noHistory: "No entries yet.",

    // Reminder
    reminder: "Reminder",
    reminderDesc: "Notification on due date",
    reminderOn: "Enabled",
    reminderOff: "Disabled",
    reminderPermissionNeeded: "Notification permission required.",
  },
  es: {
    tabPlants: 'Plantas',
    tabSearch: 'Buscar',
    tabProfile: 'Perfil',
    myPlants: 'Mis Plantas',
    searchTitle: 'Buscar',
    settingsTitle: 'Ajustes',
    darkMode: 'Modo Oscuro',
    language: 'Idioma',
    noPlants: 'Aún no hay plantas.',
    allGood: 'Todo bien',
    toWater: 'Regar',
    searchPlaceholder: 'Buscar plantas...',
    categories: 'Descubrir Categorías',
    resultsInPlants: 'Resultados en "Mis Plantas"',
    noResults: 'No se encontraron plantas.',
    
    catCareEasy: "Fácil Cuidado",
    catSucculents: "Suculentas",
    catLowLight: "Poca Luz",
    catPetFriendly: "Pet Friendly",
    catAirPurifier: "Purificador",
    catFlowering: "Con Flores",

    lexiconTitle: "Enciclopedia",
    lexiconDesc: "Explora nuestra base de datos y encuentra la adición perfecta para tu hogar.",
    lexiconSearchPlaceholder: "Buscar en enciclopedia...",
    browseLexicon: "Explorar Enciclopedia",
    backToSearch: "Volver a Buscar",

    comingSoon: 'Próximamente',
    gallery: 'Galería',
    help: 'Ayuda',
    scanner: 'Escáner',
    analyzing: 'Analizando planta...',
    localProcessing: "Procesamiento Local",

    // Scan Stages
    scanStage1: "Verificando calidad de imagen...",
    scanStage2: "Analizando estructuras...",
    scanStage3: "Comparando con base de datos...",

    result: "Resultado",
    match: "Coincidencia",
    careCheck: "Chequeo de Cuidados",
    showDetails: "Ver Detalles",
    hideDetails: "Ocultar Detalles",
    dataSavedLocally: "Datos guardados localmente",
    addToPlants: "Añadir a mis plantas",
    aboutPlant: "Sobre la planta",
    noDescription: "Sin descripción disponible.",
    careTips: "Consejos de Cuidado",
    addedOn: "Añadido el",
    plantAddedSuccess: "Planta añadida con éxito",
    
    detailedCare: "Cuidado Detallado",
    careTextWater: "Revisar humedad cada {0} días.",
    careTextLight: "Ubicación ideal: {0}.",
    careTextTemp: "Temperatura ideal: {0}.",
    
    water: "Riego",
    light: "Luz",
    temp: "Temperatura",
    
    waterModerate: "Moderado",
    waterLittle: "Poco",
    waterEveryXDays: "Cada {0} días",
    waterToday: "Regar hoy",
    inXDays: "En {0} días",
    nextWatering: "Próximo riego: {0}",
    days: "Días",

    delete: "Eliminar",
    edit: "Editar",
    share: "Compartir",
    waterNow: "Regar ahora",
    watered: "Regada",
    wateredSuccess: "¡Planta regada!",
    plantDeleted: "Planta eliminada.",
    deleteConfirmTitle: "¿Eliminar planta?",
    deleteConfirmMessage: "¿Realmente quieres eliminar esta planta de tu colección? Esto no se puede deshacer.",
    cancel: "Cancelar",
    confirm: "Eliminar",
    lastWateredDate: "Último riego: {0}",

    // History
    wateringHistory: "Historial de Riego",
    noHistory: "Sin entradas aún.",

    // Reminder
    reminder: "Recordatorio",
    reminderDesc: "Notificación el día de riego",
    reminderOn: "Activado",
    reminderOff: "Desactivado",
    reminderPermissionNeeded: "Permiso de notificación requerido.",
  }
};

export const getTranslation = (lang: Language) => translations[lang];
