'use client';

import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onDismiss?: () => void;
}

const TYPE_STYLES = {
  success: 'bg-green-50 border-green-200 text-green-700',
  error: 'bg-red-50 border-red-200 text-red-700',
  info: 'bg-blue-50 border-blue-200 text-blue-700',
};

const TYPE_ICONS = {
  success: '✓',
  error: '✗',
  info: 'ℹ',
};

export default function Toast({ message, type = 'info', duration = 3000, onDismiss }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onDismiss?.(), 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-lg border px-4 py-3 shadow-md text-sm font-medium transition-all duration-300 ${
        TYPE_STYLES[type]
      } ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
      role="status"
      aria-live="polite"
    >
      <span aria-hidden="true" className="font-bold">{TYPE_ICONS[type]}</span>
      {message}
      <button
        onClick={() => { setVisible(false); setTimeout(() => onDismiss?.(), 300); }}
        className="ml-2 opacity-60 hover:opacity-100"
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </div>
  );
}
