import React from 'react';
import { Tab } from '../types';
import { LayoutGrid, Search, User } from 'lucide-react';

interface TabBarProps {
  currentTab: Tab;
  onTabChange: (tab: Tab) => void;
  labels: {
    home: string;
    search: string;
    settings: string;
  };
}

export const TabBar: React.FC<TabBarProps> = ({ currentTab, onTabChange, labels }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 pb-safe pt-2 px-6 z-40">
      <div className="flex justify-between items-center h-16 max-w-sm mx-auto">
        <button
          onClick={() => onTabChange(Tab.HOME)}
          className={`flex flex-col items-center justify-center w-16 space-y-1.5 ${
            currentTab === Tab.HOME ? 'text-stone-900 dark:text-stone-100' : 'text-stone-400 dark:text-stone-600'
          }`}
        >
          <LayoutGrid size={24} strokeWidth={currentTab === Tab.HOME ? 2.5 : 2} />
          <span className="text-[10px] font-medium">{labels.home}</span>
        </button>

        <button
          onClick={() => onTabChange(Tab.SEARCH)}
          className={`flex flex-col items-center justify-center w-16 space-y-1.5 ${
            currentTab === Tab.SEARCH ? 'text-stone-900 dark:text-stone-100' : 'text-stone-400 dark:text-stone-600'
          }`}
        >
          <Search size={24} strokeWidth={currentTab === Tab.SEARCH ? 2.5 : 2} />
          <span className="text-[10px] font-medium">{labels.search}</span>
        </button>

        <button
          onClick={() => onTabChange(Tab.SETTINGS)}
          className={`flex flex-col items-center justify-center w-16 space-y-1.5 ${
            currentTab === Tab.SETTINGS ? 'text-stone-900 dark:text-stone-100' : 'text-stone-400 dark:text-stone-600'
          }`}
        >
          <User size={24} strokeWidth={currentTab === Tab.SETTINGS ? 2.5 : 2} />
          <span className="text-[10px] font-medium">{labels.settings}</span>
        </button>
      </div>
    </div>
  );
};