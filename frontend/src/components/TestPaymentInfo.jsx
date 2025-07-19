import React, { useState } from 'react';

export default function TestPaymentInfo() {
    const [showDetails, setShowDetails] = useState(false);

    const testCards = {
        success: {
            number: '4111 1111 1111 1111',
            description: 'Successful payment'
        },
        failure: {
            number: '4000 0000 0000 0002',
            description: 'Payment failure'
        },
        networkError: {
            number: '4000 0000 0000 9995',
            description: 'Network error'
        }
    };

    return (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 flex items-center">
                    🧪 Test Mode Active
                </h3>
                <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-200"
                >
                    {showDetails ? 'Hide' : 'Show'} Details
                </button>
            </div>

            <div className="text-sm text-yellow-700 dark:text-yellow-300">
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800 mb-3">
                    <p className="font-semibold text-green-800 dark:text-green-200">
                        💰 Test Mode Limit: ₹1,00,00,000 (1 Crore INR)
                    </p>
                    <p className="text-xs text-green-700 dark:text-green-300">
                        You can test payments up to 1 crore rupees in test mode
                    </p>
                </div>
                <p className="mb-2">
                    You're in test mode. Use these test cards for payment:
                </p>

                {showDetails && (
                    <div className="space-y-3 mt-3">
                        {Object.entries(testCards).map(([key, card]) => (
                            <div key={key} className="bg-yellow-100 dark:bg-yellow-800/50 p-3 rounded">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={`text-xs px-2 py-1 rounded ${key === 'success' ? 'bg-green-200 text-green-800' :
                                            key === 'failure' ? 'bg-red-200 text-red-800' :
                                                'bg-orange-200 text-orange-800'
                                        }`}>
                                        {key === 'success' ? '✅' : key === 'failure' ? '❌' : '⚠️'}
                                        {card.description}
                                    </span>
                                </div>
                                <div className="space-y-1 text-xs">
                                    <p><strong>Card Number:</strong> <code className="bg-white dark:bg-gray-800 px-1 rounded">{card.number}</code></p>
                                    <p><strong>Expiry:</strong> <code className="bg-white dark:bg-gray-800 px-1 rounded">12/25</code></p>
                                    <p><strong>CVV:</strong> <code className="bg-white dark:bg-gray-800 px-1 rounded">123</code></p>
                                    <p><strong>Name:</strong> <code className="bg-white dark:bg-gray-800 px-1 rounded">Test User</code></p>
                                </div>
                            </div>
                        ))}

                        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-800">
                            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">💡 Important Notes:</h4>
                            <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                                <li>• Test mode supports amounts up to ₹1,00,00,000 (1 crore)</li>
                                <li>• No real money is charged in test mode</li>
                                <li>• Use different cards to test various scenarios</li>
                                <li>• All test transactions are logged for debugging</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
} 