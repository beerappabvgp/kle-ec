import React, { useState, useEffect } from 'react';
import { testAPIConnection, testProductsAPI } from '../utils/apiTest';

export default function ApiStatus() {
    const [apiStatus, setApiStatus] = useState('checking');
    const [productsStatus, setProductsStatus] = useState('checking');

    useEffect(() => {
        const checkApi = async () => {
            try {
                const apiResult = await testAPIConnection();
                setApiStatus(apiResult ? 'connected' : 'failed');

                const productsResult = await testProductsAPI();
                setProductsStatus(productsResult ? 'connected' : 'failed');
            } catch (error) {
                setApiStatus('failed');
                setProductsStatus('failed');
            }
        };

        checkApi();
    }, []);

    return (
        <div className="fixed top-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border z-50">
            <h3 className="text-sm font-semibold mb-2">API Status</h3>
            <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                    <span>API Connection:</span>
                    <span className={`px-2 py-1 rounded ${apiStatus === 'connected' ? 'bg-green-100 text-green-800' :
                            apiStatus === 'failed' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                        }`}>
                        {apiStatus}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <span>Products API:</span>
                    <span className={`px-2 py-1 rounded ${productsStatus === 'connected' ? 'bg-green-100 text-green-800' :
                            productsStatus === 'failed' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                        }`}>
                        {productsStatus}
                    </span>
                </div>
            </div>
        </div>
    );
} 