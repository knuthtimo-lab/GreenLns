import React from 'react';

export const PlantSkeleton: React.FC = () => {
  return (
    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-stone-200 dark:bg-stone-800 animate-pulse border border-stone-300 dark:border-stone-700/50">
      
      {/* Badge Placeholder */}
      <div className="absolute top-3 left-3">
        <div className="h-6 w-20 bg-stone-300 dark:bg-stone-700 rounded-full" />
      </div>

      {/* Content Placeholder */}
      <div className="absolute bottom-4 left-3 right-3 space-y-2">
        {/* Title */}
        <div className="h-6 w-3/4 bg-stone-300 dark:bg-stone-700 rounded-md" />
        {/* Subtitle */}
        <div className="h-3 w-1/2 bg-stone-300 dark:bg-stone-700 rounded-md" />
      </div>
    </div>
  );
};