import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback(({ type, title, message, duration = 5000, action }) => {
        const id = Date.now() + Math.random();
        const newToast = { id, type, title, message, duration, action };

        setToasts(prev => [...prev, newToast]);

        // Auto remove toast after duration
        setTimeout(() => {
            removeToast(id);
        }, duration);

        return id;
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const showSuccess = useCallback((title, message, duration) => {
        return addToast({ type: 'success', title, message, duration });
    }, [addToast]);

    const showError = useCallback((title, message, duration) => {
        return addToast({ type: 'error', title, message, duration });
    }, [addToast]);

    const showWarning = useCallback((title, message, duration) => {
        return addToast({ type: 'warning', title, message, duration });
    }, [addToast]);

    const showInfo = useCallback((title, message, duration) => {
        return addToast({ type: 'info', title, message, duration });
    }, [addToast]);

    const clearAll = useCallback(() => {
        setToasts([]);
    }, []);

    return (
        <ToastContext.Provider value={{
            toasts,
            addToast,
            removeToast,
            showSuccess,
            showError,
            showWarning,
            showInfo,
            clearAll
        }}>
            {children}
            <ToastContainer />
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}

function ToastContainer() {
    const { toasts, removeToast } = useToast();

    const getToastStyles = (type) => {
        const baseStyles = "flex items-start p-4 rounded-lg shadow-xl border-l-4 transform transition-all duration-300 ease-in-out";

        switch (type) {
            case 'success':
                return `${baseStyles} bg-white dark:bg-black border-green-500 text-green-800 dark:text-green-400 shadow-green-100 dark:shadow-green-900/20`;
            case 'error':
                return `${baseStyles} bg-white dark:bg-black border-red-500 text-red-800 dark:text-red-400 shadow-red-100 dark:shadow-red-900/20`;
            case 'warning':
                return `${baseStyles} bg-white dark:bg-black border-yellow-500 text-yellow-800 dark:text-yellow-400 shadow-yellow-100 dark:shadow-yellow-900/20`;
            case 'info':
                return `${baseStyles} bg-white dark:bg-black border-blue-500 text-blue-800 dark:text-blue-400 shadow-blue-100 dark:shadow-blue-900/20`;
            default:
                return `${baseStyles} bg-white dark:bg-black border-gray-500 text-gray-800 dark:text-gray-400 shadow-gray-100 dark:shadow-gray-900/20`;
        }
    };

    const getIcon = (type) => {
        switch (type) {
            case 'success':
                return (
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                );
            case 'error':
                return (
                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                );
            case 'warning':
                return (
                    <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                );
            case 'info':
                return (
                    <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                );
            default:
                return null;
        }
    };

    if (toasts.length === 0) return null;

    return (
        <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`${getToastStyles(toast.type)} animate-slide-in`}
                    style={{ animation: 'slideIn 0.3s ease-out' }}
                >
                    <div className="flex-shrink-0 mr-3">
                        {getIcon(toast.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                        {toast.title && (
                            <h4 className="text-sm font-semibold mb-1">{toast.title}</h4>
                        )}
                        {toast.message && (
                            <p className="text-sm">{toast.message}</p>
                        )}
                        {toast.action && (
                            <div className="mt-2">
                                <button
                                    onClick={toast.action.onClick}
                                    className="text-xs font-medium underline hover:no-underline"
                                >
                                    {toast.action.text}
                                </button>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={() => removeToast(toast.id)}
                        className="flex-shrink-0 ml-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            ))}
        </div>
    );
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .animate-slide-in {
        animation: slideIn 0.3s ease-out;
    }
`;
document.head.appendChild(style); 