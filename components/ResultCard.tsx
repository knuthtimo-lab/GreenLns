
import React, { useState } from 'react';
import { IdentificationResult } from '../types';
import { Droplets, Sun, Thermometer, CheckCircle2, ArrowLeft, Share2 } from 'lucide-react';

interface ResultCardProps {
  result: IdentificationResult;
  imageUri: string;
  onSave: () => void;
  onClose: () => void;
  t: any;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, imageUri, onSave, onClose, t }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="flex flex-col h-full bg-stone-50 dark:bg-stone-950 overflow-y-auto no-scrollbar animate-in slide-in-from-right duration-300">
      
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-6 text-stone-900 dark:text-white">
        <button onClick={onClose} className="bg-white/80 dark:bg-black/50 backdrop-blur-md p-2 rounded-full shadow-sm">
            <ArrowLeft size={20} />
        </button>
        <span className="font-bold text-sm bg-white/80 dark:bg-black/50 backdrop-blur-md px-3 py-1 rounded-full">{t.result}</span>
        <button className="bg-white/80 dark:bg-black/50 backdrop-blur-md p-2 rounded-full shadow-sm">
            <Share2 size={20} />
        </button>
      </div>

      <div className="p-4 pt-20">
        {/* Hero Image */}
        <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-lg mb-6">
          <img src={imageUri} alt="Analyzed Plant" className="w-full h-full object-cover" />
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-primary-700 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm flex items-center">
             <CheckCircle2 size={14} className="mr-1.5 fill-primary-600 text-white" />
             {Math.round(result.confidence * 100)}% {t.match}
          </div>
        </div>

        {/* Info */}
        <div className="px-2">
            <h1 className="text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 leading-tight mb-1">
                {result.name}
            </h1>
            <p className="text-stone-400 dark:text-stone-500 italic text-sm mb-6">
                {result.botanicalName}
            </p>

            <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed mb-8">
                {result.description || t.noDescription}
            </p>

            {/* Care Check */}
            <div className="flex justify-between items-end mb-4">
                <h3 className="font-bold text-stone-900 dark:text-stone-100">{t.careCheck}</h3>
                <button 
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-[10px] font-bold text-primary-600 uppercase tracking-wide"
                >
                  {showDetails ? t.hideDetails : t.showDetails}
                </button>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-8">
                <div className="bg-white dark:bg-stone-900 p-3 rounded-2xl border border-stone-100 dark:border-stone-800 flex flex-col items-center text-center shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-500 flex items-center justify-center mb-2">
                        <Droplets size={16} className="fill-current" />
                    </div>
                    <span className="text-[10px] text-stone-400 font-medium mb-0.5">{t.water}</span>
                    <span className="text-xs font-bold text-stone-800 dark:text-stone-200">
                        {result.careInfo.waterIntervalDays <= 7 ? t.waterModerate : t.waterLittle}
                    </span>
                </div>

                <div className="bg-white dark:bg-stone-900 p-3 rounded-2xl border border-stone-100 dark:border-stone-800 flex flex-col items-center text-center shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-500 flex items-center justify-center mb-2">
                        <Sun size={16} className="fill-current" />
                    </div>
                    <span className="text-[10px] text-stone-400 font-medium mb-0.5">{t.light}</span>
                    <span className="text-xs font-bold text-stone-800 dark:text-stone-200 truncate w-full">
                        {result.careInfo.light}
                    </span>
                </div>

                <div className="bg-white dark:bg-stone-900 p-3 rounded-2xl border border-stone-100 dark:border-stone-800 flex flex-col items-center text-center shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-rose-50 dark:bg-rose-900/20 text-rose-500 flex items-center justify-center mb-2">
                        <Thermometer size={16} className="fill-current" />
                    </div>
                    <span className="text-[10px] text-stone-400 font-medium mb-0.5">{t.temp}</span>
                    <span className="text-xs font-bold text-stone-800 dark:text-stone-200">
                        {result.careInfo.temp}
                    </span>
                </div>
            </div>

            {/* Expanded Details */}
            {showDetails && (
              <div className="mb-8 p-5 bg-stone-100 dark:bg-stone-900/50 rounded-2xl animate-in fade-in slide-in-from-top-2 border border-stone-200 dark:border-stone-800">
                  <h4 className="font-bold text-xs mb-3 text-stone-700 dark:text-stone-300 uppercase tracking-wide">{t.detailedCare}</h4>
                  <ul className="space-y-3 text-sm text-stone-600 dark:text-stone-300">
                      <li className="flex items-start">
                          <span className="mr-3 text-primary-500">•</span>
                          <span>{t.careTextWater.replace('{0}', result.careInfo.waterIntervalDays.toString())}</span>
                      </li>
                      <li className="flex items-start">
                          <span className="mr-3 text-amber-500">•</span>
                          <span>{t.careTextLight.replace('{0}', result.careInfo.light)}</span>
                      </li>
                       <li className="flex items-start">
                          <span className="mr-3 text-rose-500">•</span>
                          <span>{t.careTextTemp.replace('{0}', result.careInfo.temp)}</span>
                      </li>
                  </ul>
              </div>
            )}

            {/* Save Button */}
            <div className="flex items-center justify-center space-x-2 text-xs text-stone-400 mb-4">
                <div className="w-3 h-3 rounded-sm border border-stone-300 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-stone-400 rounded-[1px]"></div>
                </div>
                <span>{t.dataSavedLocally}</span>
            </div>

            <button 
                onClick={onSave}
                className="w-full py-4 bg-primary-500 hover:bg-primary-600 text-black font-bold text-sm rounded-xl shadow-lg shadow-primary-500/30 active:scale-[0.98] transition-all flex items-center justify-center"
            >
                <div className="bg-black/20 rounded-full p-0.5 mr-2">
                    <CheckCircle2 size={14} className="text-black" />
                </div>
                {t.addToPlants}
            </button>
            <div className="h-8"></div>
        </div>
      </div>
    </div>
  );
};
