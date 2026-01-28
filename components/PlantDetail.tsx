
import React, { useState } from 'react';
import { Plant, Language } from '../types';
import { Droplets, Sun, Thermometer, ArrowLeft, Calendar, Trash2, Share2, Edit2, AlertCircle, Check, Clock, Bell, BellOff } from 'lucide-react';

interface PlantDetailProps {
  plant: Plant;
  onClose: () => void;
  onDelete: (id: string) => void;
  onUpdate: (plant: Plant) => void;
  t: any;
  language: Language;
}

export const PlantDetail: React.FC<PlantDetailProps> = ({ plant, onClose, onDelete, onUpdate, t, language }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Map internal language codes to locale strings for Date
  const localeMap: Record<string, string> = {
    de: 'de-DE',
    en: 'en-US',
    es: 'es-ES'
  };

  const formattedAddedDate = new Date(plant.dateAdded).toLocaleDateString(localeMap[language] || 'de-DE');
  const formattedWateredDate = new Date(plant.lastWatered).toLocaleDateString(localeMap[language] || 'de-DE');
  
  // Calculate next watering date
  const lastWateredObj = new Date(plant.lastWatered);
  const nextWateringDate = new Date(lastWateredObj);
  nextWateringDate.setDate(lastWateredObj.getDate() + plant.careInfo.waterIntervalDays);
  
  const formattedNextWatering = nextWateringDate.toLocaleDateString(localeMap[language] || 'de-DE', { weekday: 'long', day: 'numeric', month: 'numeric' });
  const nextWateringText = t.nextWatering.replace('{0}', formattedNextWatering);
  const lastWateredText = t.lastWateredDate.replace('{0}', formattedWateredDate);

  // Check if watered today
  const isWateredToday = new Date(plant.lastWatered).toDateString() === new Date().toDateString();

  const handleWaterPlant = () => {
    const now = new Date().toISOString();
    // Update history: add new date to the beginning, keep last 10 entries max
    const currentHistory = plant.wateringHistory || [];
    const newHistory = [now, ...currentHistory].slice(0, 10);
    
    const updatedPlant = {
      ...plant,
      lastWatered: now,
      wateringHistory: newHistory
    };
    onUpdate(updatedPlant);
  };

  const toggleReminder = async () => {
    const newValue = !plant.notificationsEnabled;

    if (newValue) {
      // Request permission if enabling
      if (!('Notification' in window)) {
        alert("Notifications are not supported by this browser.");
        return;
      }
      
      if (Notification.permission === 'granted') {
         onUpdate({ ...plant, notificationsEnabled: true });
      } else if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
           onUpdate({ ...plant, notificationsEnabled: true });
        }
      } else {
        alert(t.reminderPermissionNeeded);
      }
    } else {
      // Disabling
      onUpdate({ ...plant, notificationsEnabled: false });
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    onDelete(plant.id);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col h-full bg-stone-50 dark:bg-stone-950 overflow-y-auto no-scrollbar animate-in slide-in-from-right duration-300">

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-6 text-stone-900 dark:text-white">
        <button onClick={onClose} className="bg-white/80 dark:bg-black/50 backdrop-blur-md p-2 rounded-full shadow-sm">
            <ArrowLeft size={20} />
        </button>
        <div className="flex space-x-2">
            <button className="bg-white/80 dark:bg-black/50 backdrop-blur-md p-2 rounded-full shadow-sm">
                <Share2 size={20} />
            </button>
            <button className="bg-white/80 dark:bg-black/50 backdrop-blur-md p-2 rounded-full shadow-sm">
                <Edit2 size={20} />
            </button>
        </div>
      </div>

      <div className="flex-1">
        {/* Hero Image */}
        <div className="relative w-full aspect-[4/5] md:aspect-video rounded-b-[2.5rem] overflow-hidden shadow-lg mb-6">
          <img src={plant.imageUri} alt={plant.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          <div className="absolute bottom-8 left-6 right-6">
             <h1 className="text-3xl font-serif font-bold text-white leading-tight mb-1 shadow-sm">
                {plant.name}
            </h1>
            <p className="text-stone-200 italic text-sm">
                {plant.botanicalName}
            </p>
          </div>
        </div>

        {/* Content Container */}
        <div className="px-6 pb-24">
            {/* Added Date Info */}
            <div className="flex justify-between items-center text-xs text-stone-500 dark:text-stone-400 mb-6">
                <div className="flex items-center space-x-1.5 bg-white dark:bg-stone-900 px-3 py-1.5 rounded-full border border-stone-100 dark:border-stone-800">
                    <Calendar size={12} />
                    <span>{t.addedOn} {formattedAddedDate}</span>
                </div>
            </div>

            {/* Main Action: Water */}
            <div className={`mb-3 p-4 rounded-2xl border flex justify-between items-center transition-colors ${
              isWateredToday 
                ? 'bg-green-50 dark:bg-green-900/10 border-green-100 dark:border-green-800/30' 
                : 'bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-800/30'
            }`}>
                <div>
                   <span className="block text-xs text-stone-500 dark:text-stone-400 font-medium mb-0.5">{lastWateredText}</span>
                   <span className={`block text-sm font-bold ${isWateredToday ? 'text-green-700 dark:text-green-300' : 'text-stone-900 dark:text-stone-200'}`}>
                     {nextWateringText}
                   </span>
                </div>
                <button 
                  onClick={handleWaterPlant}
                  disabled={isWateredToday}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center shadow-lg transition-all ${
                    isWateredToday
                      ? 'bg-green-500 text-white cursor-default shadow-green-500/30'
                      : 'bg-blue-500 hover:bg-blue-600 active:scale-95 text-white shadow-blue-500/30'
                  }`}
                >
                    {isWateredToday ? (
                      <>
                        <Check size={14} className="mr-2" />
                        {t.watered}
                      </>
                    ) : (
                      <>
                        <Droplets size={14} className="mr-2 fill-current" />
                        {t.waterNow}
                      </>
                    )}
                </button>
            </div>

            {/* Reminder Toggle */}
            <div className="mb-8 flex items-center justify-between p-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800">
                <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${plant.notificationsEnabled ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' : 'bg-stone-100 text-stone-400 dark:bg-stone-800 dark:text-stone-500'}`}>
                        {plant.notificationsEnabled ? <Bell size={18} /> : <BellOff size={18} />}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-stone-900 dark:text-stone-100">{t.reminder}</span>
                        <span className="text-[10px] text-stone-500">{plant.notificationsEnabled ? t.reminderOn : t.reminderOff}</span>
                    </div>
                </div>
                <button 
                    onClick={toggleReminder}
                    className={`w-11 h-6 rounded-full relative transition-colors duration-300 ${plant.notificationsEnabled ? 'bg-primary-500' : 'bg-stone-300 dark:bg-stone-700'}`}
                >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-sm ${plant.notificationsEnabled ? 'left-6' : 'left-1'}`} />
                </button>
            </div>

            <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-2">{t.aboutPlant}</h3>
            <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed mb-8">
                {plant.description || t.noDescription}
            </p>

            {/* Care Info */}
            <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-4">{t.careTips}</h3>
            <div className="grid grid-cols-3 gap-3 mb-10">
                <div className="bg-white dark:bg-stone-900 p-3 rounded-2xl border border-stone-100 dark:border-stone-800 flex flex-col items-center text-center shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-500 flex items-center justify-center mb-2">
                        <Droplets size={16} className="fill-current" />
                    </div>
                    <span className="text-[10px] text-stone-400 font-medium mb-0.5">{t.water}</span>
                    <span className="text-xs font-bold text-stone-800 dark:text-stone-200">
                         {plant.careInfo.waterIntervalDays} {t.days || 'Tage'}
                    </span>
                </div>

                <div className="bg-white dark:bg-stone-900 p-3 rounded-2xl border border-stone-100 dark:border-stone-800 flex flex-col items-center text-center shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-500 flex items-center justify-center mb-2">
                        <Sun size={16} className="fill-current" />
                    </div>
                    <span className="text-[10px] text-stone-400 font-medium mb-0.5">{t.light}</span>
                    <span className="text-xs font-bold text-stone-800 dark:text-stone-200 truncate w-full">
                        {plant.careInfo.light}
                    </span>
                </div>

                <div className="bg-white dark:bg-stone-900 p-3 rounded-2xl border border-stone-100 dark:border-stone-800 flex flex-col items-center text-center shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-rose-50 dark:bg-rose-900/20 text-rose-500 flex items-center justify-center mb-2">
                        <Thermometer size={16} className="fill-current" />
                    </div>
                    <span className="text-[10px] text-stone-400 font-medium mb-0.5">{t.temp}</span>
                    <span className="text-xs font-bold text-stone-800 dark:text-stone-200">
                        {plant.careInfo.temp}
                    </span>
                </div>
            </div>

            {/* Watering History Section */}
            <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-4">{t.wateringHistory}</h3>
            <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-100 dark:border-stone-800 overflow-hidden mb-10 shadow-sm">
               {(!plant.wateringHistory || plant.wateringHistory.length === 0) ? (
                 <div className="p-6 text-center text-stone-400 text-sm">
                   <Clock size={24} className="mx-auto mb-2 opacity-50" />
                   {t.noHistory}
                 </div>
               ) : (
                 <ul className="divide-y divide-stone-100 dark:divide-stone-800">
                   {plant.wateringHistory.slice(0, 5).map((dateStr, index) => (
                     <li key={index} className="px-5 py-3 flex justify-between items-center group hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                        <div className="flex items-center space-x-3">
                           <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/10 text-blue-500 flex items-center justify-center">
                              <Droplets size={14} className="fill-current" />
                           </div>
                           <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
                              {new Date(dateStr).toLocaleDateString(localeMap[language] || 'de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                           </span>
                        </div>
                        <span className="text-xs font-mono text-stone-400 bg-stone-100 dark:bg-stone-800 px-2 py-1 rounded-md">
                           {new Date(dateStr).toLocaleTimeString(localeMap[language] || 'de-DE', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                     </li>
                   ))}
                 </ul>
               )}
            </div>

            {/* Danger Zone */}
            <div className="border-t border-stone-200 dark:border-stone-800 pt-6 flex justify-center">
                 <button 
                    onClick={handleDeleteClick}
                    className="flex items-center space-x-2 text-red-500 hover:text-red-600 px-4 py-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                 >
                    <Trash2 size={16} />
                    <span className="text-sm font-medium">{t.delete}</span>
                 </button>
            </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="absolute inset-0 z-[60] bg-black/40 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-stone-900 w-full max-w-sm rounded-2xl p-6 shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <AlertCircle size={24} />
                </div>
                <h3 className="text-xl font-bold text-center text-stone-900 dark:text-white mb-2">{t.deleteConfirmTitle}</h3>
                <p className="text-stone-500 dark:text-stone-400 text-center text-sm mb-6 leading-relaxed">
                    {t.deleteConfirmMessage}
                </p>
                
                <div className="grid grid-cols-2 gap-3">
                    <button 
                        onClick={handleCancelDelete}
                        className="py-3 px-4 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold text-sm"
                    >
                        {t.cancel}
                    </button>
                    <button 
                        onClick={handleConfirmDelete}
                        className="py-3 px-4 rounded-xl bg-red-500 text-white font-bold text-sm hover:bg-red-600"
                    >
                        {t.confirm}
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
