import { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const dismissToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    setToasts((prevToasts) => [...prevToasts, { id, message, type, duration }]);
    
    setTimeout(() => {
      dismissToast(id);
    }, duration);
  }, [dismissToast]);

  const getToastIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-rose-500 shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-blue-500 shrink-0" />;
    }
  };

  const getToastStyles = (type) => {
    switch (type) {
      case 'success':
        return 'border-emerald-100 dark:border-emerald-950 bg-emerald-50/95 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-200';
      case 'error':
        return 'border-rose-100 dark:border-rose-950 bg-rose-50/95 dark:bg-rose-950/20 text-rose-900 dark:text-rose-200';
      case 'warning':
        return 'border-amber-100 dark:border-amber-950 bg-amber-50/95 dark:bg-amber-950/20 text-amber-900 dark:text-amber-200';
      case 'info':
      default:
        return 'border-blue-100 dark:border-blue-950 bg-blue-50/95 dark:bg-blue-950/20 text-blue-900 dark:text-blue-200';
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Overlay Container */}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 w-full max-w-sm px-4 sm:px-0 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg backdrop-blur-md transition-all duration-300 animate-toast-in ${getToastStyles(
              toast.type
            )}`}
          >
            {getToastIcon(toast.type)}
            <div className="flex-1 text-sm font-medium leading-5 break-words">
              {toast.message}
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors cursor-pointer shrink-0"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
