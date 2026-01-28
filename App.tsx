
import React, { useState, useEffect, useRef } from 'react';
import { Tab, Plant, IdentificationResult, Language } from './types';
import { StorageService } from './services/storageService';
import { PlantRecognitionService } from './services/plantRecognitionService';
import { PlantDatabaseService } from './services/plantDatabaseService';
import { getTranslation } from './utils/translations';
import { TabBar } from './components/TabBar';
import { PlantCard } from './components/PlantCard';
import { PlantSkeleton } from './components/PlantSkeleton';
import { ResultCard } from './components/ResultCard';
import { PlantDetail } from './components/PlantDetail';
import { Toast } from './components/Toast';
import { Camera, Image as ImageIcon, HelpCircle, X, Settings as SettingsIcon, ScanLine, Leaf, Plus, Zap, Search, ArrowRight, ArrowLeft, Globe, ChevronDown, ChevronUp, Check, Cpu, BookOpen } from 'lucide-react';

const generateId = () => Math.random().toString(36).substr(2, 9);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.HOME);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState<Language>('de');
  const [isLoadingPlants, setIsLoadingPlants] = useState(true);
  
  // Search State
  const [searchQuery, setSearchQuery] = useState('');

  // Lexicon State
  const [isLexiconOpen, setIsLexiconOpen] = useState(false);
  const [lexiconSearchQuery, setLexiconSearchQuery] = useState('');

  // Settings State
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  // Scanner Modal State
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Analysis State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<IdentificationResult | null>(null);
  
  // Detail State
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

  // Toast State
  const [toast, setToast] = useState({ message: '', visible: false });

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Derived state for translations
  const t = getTranslation(language);

  useEffect(() => {
    const loadData = async () => {
      setIsLoadingPlants(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setPlants(StorageService.getPlants());
      setLanguage(StorageService.getLanguage());
      setIsLoadingPlants(false);
    };

    loadData();

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    StorageService.saveLanguage(lang);
    setIsLanguageDropdownOpen(false);
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setSelectedImage(base64String);
        analyzeImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (imageUri: string) => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setAnalysisResult(null);

    // Simulate realistic progress
    const progressInterval = setInterval(() => {
        setAnalysisProgress(prev => {
            // Fast start
            if (prev < 30) return prev + Math.random() * 8;
            // Slower middle (processing)
            if (prev < 70) return prev + Math.random() * 2;
            // Stall at end (waiting for API)
            if (prev < 90) return prev + 0.5;
            return prev;
        });
    }, 150);

    try {
      // Pass the current language to the service
      const result = await PlantRecognitionService.identify(imageUri, language);
      
      clearInterval(progressInterval);
      setAnalysisProgress(100);

      // Short delay to allow user to see 100% completion
      setTimeout(() => {
        setAnalysisResult(result);
        setIsAnalyzing(false);
      }, 500);

    } catch (error) {
      clearInterval(progressInterval);
      console.error("Analysis failed", error);
      alert("Fehler bei der Analyse.");
      setSelectedImage(null);
      setIsAnalyzing(false);
    }
  };

  const showToast = (message: string) => {
    setToast({ message, visible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, visible: false }));
  };

  const savePlant = () => {
    if (analysisResult && selectedImage) {
      const now = new Date().toISOString();
      const newPlant: Plant = {
        id: generateId(),
        name: analysisResult.name,
        botanicalName: analysisResult.botanicalName,
        imageUri: selectedImage,
        dateAdded: now,
        careInfo: analysisResult.careInfo,
        lastWatered: now,
        wateringHistory: [now], // Initialize history with the creation date/first watering
        description: analysisResult.description,
        notificationsEnabled: false // Default off
      };
      
      StorageService.savePlant(newPlant);
      setPlants(StorageService.getPlants());
      closeScanner();
      
      // Also close lexicon if open
      setIsLexiconOpen(false);
      
      showToast(t.plantAddedSuccess);
    }
  };

  const closeScanner = () => {
    setIsScannerOpen(false);
    setSelectedImage(null);
    setAnalysisResult(null);
    setIsAnalyzing(false);
    setAnalysisProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const openScanner = () => {
    setIsScannerOpen(true);
  };

  const handlePlantClick = (plant: Plant) => {
    setSelectedPlant(plant);
  };

  const closeDetail = () => {
    setSelectedPlant(null);
  };

  const handleDeletePlant = (id: string) => {
    StorageService.deletePlant(id);
    setPlants(prev => prev.filter(p => p.id !== id));
    closeDetail();
    showToast(t.plantDeleted);
  };

  const handleUpdatePlant = (updatedPlant: Plant) => {
    StorageService.updatePlant(updatedPlant);
    setPlants(prev => prev.map(p => p.id === updatedPlant.id ? updatedPlant : p));
    setSelectedPlant(updatedPlant);
    showToast(t.wateredSuccess);
  };

  // Lexicon Handling
  const handleLexiconItemClick = (item: any) => {
    // We treat this like a "Scan Result" for simplicity, reusing the ResultCard
    setAnalysisResult(item);
    setSelectedImage(item.imageUri);
    // Since ResultCard is rendered conditionally based on analysisResult && selectedImage, 
    // we need to make sure the view is visible.
    // We will render ResultCard inside the Lexicon view if selected.
  };

  const closeLexiconResult = () => {
      setAnalysisResult(null);
      setSelectedImage(null);
  };


  // --- SCREENS ---

  const renderHome = () => (
    <div className="pt-8 pb-24 px-6 min-h-screen bg-stone-50 dark:bg-stone-950">
      <header className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">{t.myPlants}</h1>
        <button onClick={() => setActiveTab(Tab.SETTINGS)}>
            <SettingsIcon size={24} className="text-stone-900 dark:text-stone-100" />
        </button>
      </header>

      {/* Filters */}
      <div className="flex space-x-3 mb-6 overflow-x-auto no-scrollbar">
        <button className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-stone-900 rounded-full shadow-sm border border-stone-100 dark:border-stone-800 flex-shrink-0">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs font-bold text-stone-800 dark:text-stone-200">{t.allGood}</span>
        </button>
        <button className="flex items-center space-x-2 px-4 py-2 bg-stone-100 dark:bg-stone-900/50 rounded-full text-stone-400 flex-shrink-0">
            <span className="text-xs font-medium">{t.toWater} (0)</span>
        </button>
      </div>
      
      {isLoadingPlants ? (
        <div className="grid grid-cols-2 gap-4 animate-in fade-in duration-500">
          {[1, 2, 3, 4].map((i) => (
            <PlantSkeleton key={i} />
          ))}
        </div>
      ) : plants.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center opacity-60 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Leaf size={64} className="text-stone-300 dark:text-stone-700 mb-4" />
          <p className="text-lg font-medium text-stone-600 dark:text-stone-400">{t.noPlants}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 animate-in fade-in duration-500">
          {plants.map(plant => (
            <PlantCard key={plant.id} plant={plant} onClick={() => handlePlantClick(plant)} t={t} />
          ))}
        </div>
      )}

      {/* FAB */}
      <button 
        onClick={openScanner}
        className="fixed bottom-24 right-6 w-14 h-14 bg-primary-500 hover:bg-primary-600 rounded-full shadow-lg shadow-primary-500/40 flex items-center justify-center text-white z-30 transition-transform active:scale-90"
      >
        <Camera size={26} />
      </button>
    </div>
  );

  const renderSearch = () => {
    const filteredPlants = plants.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.botanicalName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const categories = [
      { name: t.catCareEasy, color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
      { name: t.catSucculents, color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
      { name: t.catLowLight, color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400" },
      { name: t.catPetFriendly, color: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400" },
      { name: t.catAirPurifier, color: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400" },
      { name: t.catFlowering, color: "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-400" },
    ];

    return (
      <div className="pt-8 pb-24 px-6 min-h-screen bg-stone-50 dark:bg-stone-950">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6">{t.searchTitle}</h1>
          
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-stone-400" size={20} />
            <input 
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl py-3 pl-12 pr-4 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50 placeholder:text-stone-400"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </header>

        {searchQuery ? (
          <div>
             <h2 className="text-sm font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-4">
              {filteredPlants.length} {t.resultsInPlants}
             </h2>
             {filteredPlants.length > 0 ? (
               <div className="grid grid-cols-2 gap-4">
                 {filteredPlants.map(plant => (
                   <PlantCard key={plant.id} plant={plant} onClick={() => handlePlantClick(plant)} t={t} />
                 ))}
               </div>
             ) : (
               <div className="text-center py-12">
                 <p className="text-stone-500 dark:text-stone-400">{t.noResults}</p>
               </div>
             )}
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-4">{t.categories}</h2>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((cat) => (
                <button 
                  key={cat.name}
                  className={`p-4 rounded-xl text-left font-medium transition-transform active:scale-95 flex justify-between items-center group ${cat.color}`}
                >
                  <span>{cat.name}</span>
                  <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
                </button>
              ))}
            </div>

            <div 
              onClick={() => setIsLexiconOpen(true)}
              className="mt-8 p-6 bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl text-white shadow-lg relative overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
            >
               <div className="relative z-10">
                 <h3 className="text-xl font-serif font-bold mb-2 flex items-center">
                    <BookOpen size={20} className="mr-2" />
                    {t.lexiconTitle}
                 </h3>
                 <p className="text-primary-100 text-sm mb-4">{t.lexiconDesc}</p>
                 <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">{t.browseLexicon}</span>
               </div>
               <Leaf size={120} className="absolute -bottom-6 -right-6 text-white/10 rotate-12" />
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderLexicon = () => {
    if (!isLexiconOpen) return null;

    // If we have a selected item from Lexicon, show ResultCard (Detail View)
    if (analysisResult && selectedImage) {
        return (
            <div className="fixed inset-0 z-[60] bg-stone-50 dark:bg-black">
                <ResultCard 
                    result={analysisResult} 
                    imageUri={selectedImage} 
                    onSave={savePlant} 
                    onClose={closeLexiconResult} 
                    t={t}
                />
            </div>
        );
    }

    const lexiconPlants = PlantDatabaseService.searchPlants(lexiconSearchQuery, language);

    return (
        <div className="fixed inset-0 z-50 bg-stone-50 dark:bg-stone-950 flex flex-col animate-in slide-in-from-bottom duration-300">
            {/* Header */}
            <div className="p-6 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 flex items-center space-x-4 sticky top-0 z-10">
                <button onClick={() => setIsLexiconOpen(false)} className="p-2 -ml-2 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100">{t.lexiconTitle}</h1>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
                
                {/* Search */}
                <div className="relative mb-6">
                    <Search className="absolute left-4 top-3.5 text-stone-400" size={20} />
                    <input 
                        type="text"
                        placeholder={t.lexiconSearchPlaceholder}
                        value={lexiconSearchQuery}
                        onChange={(e) => setLexiconSearchQuery(e.target.value)}
                        className="w-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl py-3 pl-12 pr-4 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50 placeholder:text-stone-400"
                    />
                </div>

                {/* Grid - NOW 3 COLUMNS */}
                <div className="grid grid-cols-3 gap-3 pb-20">
                    {lexiconPlants.map((plant, index) => (
                        <button 
                            key={index}
                            onClick={() => handleLexiconItemClick(plant)}
                            className="text-left bg-white dark:bg-stone-900 rounded-2xl overflow-hidden shadow-sm border border-stone-100 dark:border-stone-800 group active:scale-[0.98] transition-all"
                        >
                            <div className="aspect-square relative">
                                <img src={plant.imageUri} className="w-full h-full object-cover" loading="lazy" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                            </div>
                            <div className="p-2">
                                <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 truncate">{plant.name}</h3>
                                <p className="text-[10px] text-stone-500 dark:text-stone-400 italic truncate">{plant.botanicalName}</p>
                            </div>
                        </button>
                    ))}
                    {lexiconPlants.length === 0 && (
                        <div className="col-span-3 text-center py-10 text-stone-400">
                            {t.noResults}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
  };

  const renderSettings = () => {
    const languages: { code: Language; label: string }[] = [
        { code: 'de', label: 'Deutsch' },
        { code: 'en', label: 'English' },
        { code: 'es', label: 'Español' }
    ];

    const currentLangLabel = languages.find(l => l.code === language)?.label;

    return (
        <div className="pt-12 px-6 h-screen bg-stone-50 dark:bg-stone-950 pb-24">
            <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-8">{t.settingsTitle}</h1>
            
            {/* Dark Mode Settings */}
            <div className="bg-white dark:bg-stone-900 p-4 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-800 flex justify-between items-center mb-4">
                <span className="font-medium text-stone-900 dark:text-stone-200">{t.darkMode}</span>
                <button onClick={toggleDarkMode} className={`w-12 h-7 rounded-full relative ${isDarkMode ? 'bg-primary-600' : 'bg-stone-300'}`}>
                    <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${isDarkMode ? 'left-6' : 'left-1'}`} />
                </button>
            </div>

            {/* Language Settings (Dropdown Style) */}
            <div className="bg-white dark:bg-stone-900 p-4 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-800 transition-all duration-300">
                <div 
                    className="flex justify-between items-center cursor-pointer" 
                    onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                >
                    <div className="flex items-center space-x-2">
                        <Globe size={18} className="text-stone-400" />
                        <span className="font-medium text-stone-900 dark:text-stone-200">{t.language}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-primary-600 dark:text-primary-400">{currentLangLabel}</span>
                        {isLanguageDropdownOpen ? <ChevronUp size={16} className="text-stone-400" /> : <ChevronDown size={16} className="text-stone-400" />}
                    </div>
                </div>
                
                {/* Dropdown Content */}
                {isLanguageDropdownOpen && (
                    <div className="mt-4 pt-4 border-t border-stone-100 dark:border-stone-800 animate-in slide-in-from-top-2">
                        <div className="space-y-2">
                            {languages.map((lang) => (
                                <button 
                                    key={lang.code}
                                    onClick={() => changeLanguage(lang.code)}
                                    className={`w-full flex justify-between items-center p-3 rounded-xl transition-colors ${
                                        language === lang.code 
                                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' 
                                        : 'hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300'
                                    }`}
                                >
                                    <span className="font-medium text-sm">{lang.label}</span>
                                    {language === lang.code && <Check size={16} />}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
  };

  const renderScannerModal = () => {
    if (!isScannerOpen) return null;

    // 1. Result View
    if (analysisResult && selectedImage) {
        return (
            <div className="fixed inset-0 z-50 bg-stone-50 dark:bg-black">
                <ResultCard 
                    result={analysisResult} 
                    imageUri={selectedImage} 
                    onSave={savePlant} 
                    onClose={closeScanner} 
                    t={t}
                />
            </div>
        );
    }

    // 2. Scanner View
    return (
        <div className="fixed inset-0 z-50 bg-stone-900 flex flex-col">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10 text-white">
                <button onClick={closeScanner}><X size={28} /></button>
                <span className="font-medium text-lg">{t.scanner}</span>
                <button><Zap size={24} className="text-white/50" /></button>
            </div>

            {/* Main Camera Area */}
            <div className="flex-1 relative overflow-hidden flex items-center justify-center">
                {selectedImage ? (
                    <img src={selectedImage} className="absolute inset-0 w-full h-full object-cover opacity-50 blur-sm" />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 pointer-events-none"></div>
                )}
                
                {/* Background Grid */}
                 <div className="absolute inset-0 opacity-10 pointer-events-none" 
                    style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
                </div>

                {/* Scan Frame */}
                <div className="w-64 h-80 border-[3px] border-white/30 rounded-[2rem] relative flex items-center justify-center overflow-hidden backdrop-blur-[2px]">
                   
                   {/* SHOW SELECTED IMAGE IN FRAME */}
                   {selectedImage && (
                        <img 
                            src={selectedImage} 
                            className="absolute inset-0 w-full h-full object-cover" 
                            alt="Scan preview"
                        />
                   )}

                   <div className="absolute top-4 left-4 w-6 h-6 border-t-4 border-l-4 border-white rounded-tl-xl z-10"></div>
                   <div className="absolute top-4 right-4 w-6 h-6 border-t-4 border-r-4 border-white rounded-tr-xl z-10"></div>
                   <div className="absolute bottom-4 left-4 w-6 h-6 border-b-4 border-l-4 border-white rounded-bl-xl z-10"></div>
                   <div className="absolute bottom-4 right-4 w-6 h-6 border-b-4 border-r-4 border-white rounded-br-xl z-10"></div>
                   
                   {/* Laser Line */}
                   {isAnalyzing || !selectedImage ? (
                     <div className="absolute left-0 right-0 h-0.5 bg-primary-400 shadow-[0_0_15px_rgba(74,222,128,0.8)] animate-scan z-20"></div>
                   ) : null}
                </div>
            </div>

            {/* Analyzing Sheet Overlay - Loading Animation */}
            {isAnalyzing && (
                <div className="absolute bottom-32 left-4 right-4 bg-white dark:bg-stone-800 rounded-2xl p-4 shadow-xl flex flex-col animate-in slide-in-from-bottom-5 z-30">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-stone-900 dark:text-white text-sm transition-all">
                             {analysisProgress < 100 ? t.analyzing : t.result}
                        </span>
                        <span className="font-mono text-xs font-bold text-stone-500 dark:text-stone-400">
                            {Math.round(analysisProgress)}%
                        </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="h-2 w-full bg-stone-100 dark:bg-stone-700 rounded-full overflow-hidden mb-3 relative">
                        <div 
                            className="h-full bg-primary-500 rounded-full transition-all duration-300 ease-out"
                            style={{ width: `${analysisProgress}%` }}
                        ></div>
                    </div>

                    {/* Stage Indicators */}
                    <div className="flex justify-between items-center text-[10px] text-stone-400 font-bold uppercase tracking-wider">
                         <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full mr-1.5 ${analysisProgress < 100 ? 'bg-amber-400 animate-pulse' : 'bg-green-500'}`}></div>
                            {t.localProcessing}
                         </div>
                         <span className="opacity-70 transition-opacity duration-300 text-right">
                            {analysisProgress < 30 ? t.scanStage1 : analysisProgress < 75 ? t.scanStage2 : t.scanStage3}
                         </span>
                    </div>
                </div>
            )}

            {/* Bottom Controls */}
            <div className="bg-white rounded-t-[2.5rem] px-8 pt-8 pb-12 flex justify-between items-center">
                <div className="flex flex-col items-center space-y-1">
                    <button onClick={() => fileInputRef.current?.click()} className="p-4 bg-stone-100 rounded-2xl text-stone-600 active:scale-95 transition-transform">
                        <ImageIcon size={24} />
                    </button>
                    <span className="text-xs font-medium text-stone-500">{t.gallery}</span>
                </div>
                
                <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-20 h-20 bg-primary-500 rounded-full border-4 border-stone-100 shadow-xl flex items-center justify-center active:scale-95 transition-transform"
                >
                    <div className="w-16 h-16 bg-white/20 rounded-full"></div>
                </button>

                <div className="flex flex-col items-center space-y-1">
                    <button className="p-4 bg-stone-50 rounded-2xl text-stone-400">
                        <HelpCircle size={24} />
                    </button>
                    <span className="text-xs font-medium text-stone-300">{t.help}</span>
                </div>

                <input 
                    type="file" 
                    accept="image/*" 
                    capture="environment"
                    className="hidden" 
                    ref={fileInputRef}
                    onChange={handleImageSelect}
                />
            </div>
        </div>
    );
  };

  return (
    <div className="max-w-md mx-auto min-h-screen relative overflow-hidden bg-stone-50 dark:bg-stone-950 shadow-2xl">
      <div className="h-full overflow-y-auto no-scrollbar">
        {activeTab === Tab.HOME && renderHome()}
        {activeTab === Tab.SETTINGS && renderSettings()}
        {activeTab === Tab.SEARCH && renderSearch()}
      </div>
      
      <TabBar 
        currentTab={activeTab} 
        onTabChange={setActiveTab} 
        labels={{ home: t.tabPlants, search: t.tabSearch, settings: t.tabProfile }} 
      />
      
      {/* Modal Layer for Detail View */}
      {selectedPlant && (
        <PlantDetail 
            plant={selectedPlant} 
            onClose={closeDetail} 
            onDelete={handleDeletePlant}
            onUpdate={handleUpdatePlant}
            t={t} 
            language={language} 
        />
      )}

      {/* Modal Layer for Scanner */}
      {renderScannerModal()}

      {/* Lexicon Overlay */}
      {renderLexicon()}

      {/* Toast Notification */}
      <Toast message={toast.message} isVisible={toast.visible} onClose={hideToast} />
    </div>
  );
};

export default App;
