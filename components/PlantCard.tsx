import React from 'react';
import { Plant } from '../types';
import { Droplets } from 'lucide-react';

interface PlantCardProps {
  plant: Plant;
  onClick: () => void;
  t: any; // Using any for simplicity with the dynamic translation object
}

export const PlantCard: React.FC<PlantCardProps> = ({ plant, onClick, t }) => {
  const daysUntilWatering = plant.careInfo.waterIntervalDays; 
  // Very basic check logic for MVP
  const isUrgent = daysUntilWatering <= 1;

  const wateringText = isUrgent 
    ? t.waterToday 
    : t.inXDays.replace('{0}', daysUntilWatering.toString());

  return (
    <button 
      onClick={onClick}
      className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-md group active:scale-[0.98] transition-transform w-full text-left"
    >
      <img 
        src={plant.imageUri} 
        alt={plant.name} 
        className="w-full h-full object-cover"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      
      {/* Badge */}
      <div className="absolute top-3 left-3">
        <div className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full backdrop-blur-md ${
          isUrgent 
            ? 'bg-orange-500 text-white' 
            : 'bg-black/40 text-stone-200 border border-white/10'
        }`}>
          <Droplets size={10} className="fill-current" />
          <span className="text-[10px] font-bold">
            {wateringText}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="absolute bottom-4 left-3 right-3">
        <h3 className="text-white font-bold text-lg leading-tight font-serif mb-0.5 shadow-sm">
          {plant.name}
        </h3>
        <p className="text-stone-300 text-xs truncate">
          {plant.botanicalName}
        </p>
      </div>
    </button>
  );
};