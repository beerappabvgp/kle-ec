import React, { useState } from 'react';

export default function TestPaymentInfo() {
    const [showDetails, setShowDetails] = useState(false);

    const testCards = {
        success: {
            number: '4111 1111 1111 1111',
            description: 'Successful payment',
            icon: '✅'
        },
        failure: {
            number: '4000 0000 0000 0002',
            description: 'Payment failure',
            icon: '❌'
        },
        networkError: {
            number: '4000 0000 0000 9995',
            description: 'Network error',
            icon: '⚠️'
        }
    };

    return (
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-amber-800 dark:text-amber-200 flex items-center gap-2">
                    <div className="w-6 h-6 bg-amber-100 dark:bg-amber-800 rounded-full flex items-center justify-center">
                        <span className="text-sm">🧪</span>
                    </div>
                    Test Mode Active
                </h3>
                <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-200 font-medium text-sm transition-colors duration-200"
                >
                    {showDetails ? 'Hide Details' : 'Show Details'}
                </button>
            </div>

            <div className="text-sm text-amber-700 dark:text-amber-300">
                {/* Limit Information */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center">
                            <span className="text-xs">💰</span>
                        </div>
                        <p className="font-bold text-green-800 dark:text-green-200">
                            Test Mode Limit: ₹1,00,00,000 (1 Crore INR)
                        </p>
                    </div>
                    <p className="text-xs text-green-700 dark:text-green-300">
                        You can test payments up to 1 crore rupees in test mode
                    </p>
                </div>

                <p className="mb-3 font-medium">
                    Use these test cards for payment:
                </p>

                {showDetails && (
                    <div className="space-y-3 mt-4">
                        {Object.entries(testCards).map(([key, card]) => (
                            <div key={key} className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-amber-200 dark:border-amber-700 shadow-sm">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-lg">{card.icon}</span>
                                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${key === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200' :
                                            key === 'failure' ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200' :
                                                'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-200'
                                        }`}>
                                        {card.description}
                                    </span>
                                </div>
                                <div className="space-y-2 text-xs">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-gray-700 dark:text-gray-300 w-16">Card:</span>
                                        <code className="bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded font-mono text-gray-800 dark:text-gray-200">
                                            {card.number}
                                        </code>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-gray-700 dark:text-gray-300 w-16">Expiry:</span>
                                        <code className="bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded font-mono text-gray-800 dark:text-gray-200">
                                            12/25
                                        </code>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-gray-700 dark:text-gray-300 w-16">CVV:</span>
                                        <code className="bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded font-mono text-gray-800 dark:text-gray-200">
                                            123
                                        </code>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-gray-700 dark:text-gray-300 w-16">Name:</span>
                                        <code className="bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded font-mono text-gray-800 dark:text-gray-200">
                                            Test User
                                        </code>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Important Notes */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-5 h-5 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center">
                                    <span className="text-xs">💡</span>
                                </div>
                                <h4 className="font-bold text-blue-800 dark:text-blue-200">Important Notes:</h4>
                            </div>
                            <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500 dark:text-blue-400 mt-0.5">•</span>
                                    <span>Test mode supports amounts up to ₹1,00,00,000 (1 crore)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500 dark:text-blue-400 mt-0.5">•</span>
                                    <span>No real money is charged in test mode</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500 dark:text-blue-400 mt-0.5">•</span>
                                    <span>Use different cards to test various scenarios</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500 dark:text-blue-400 mt-0.5">•</span>
                                    <span>All test transactions are logged for debugging</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
} 