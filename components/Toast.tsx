
import React, { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onClose, 300); // Wait for animation
      }, 3000);
      return () => clearTimeout(timer);
    } else {
        setShow(false);
    }
  }, [isVisible, onClose]);

  if (!isVisible && !show) return null;

  return (
    <div className={`fixed bottom-20 left-0 right-0 z-[70] flex justify-center pointer-events-none transition-all duration-300 transform ${show ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
      <div className="bg-stone-900 dark:bg-white text-white dark:text-stone-900 px-4 py-3 rounded-full shadow-lg flex items-center space-x-2">
        <CheckCircle2 size={18} className="text-green-500" />
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
};
