import React, { useState, useEffect } from 'react';
import api from '../api/axios';

export default function ApiTestPage() {
    const [testResults, setTestResults] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        runTests();
    }, []);

    const runTests = async () => {
        setLoading(true);
        const results = {};

        try {
            // Test 1: Basic API connection
            try {
                const response = await api.get('/test');
                results.apiTest = {
                    success: true,
                    data: response.data
                };
            } catch (error) {
                results.apiTest = {
                    success: false,
                    error: error.message
                };
            }

            // Test 2: Products endpoint
            try {
                const response = await api.get('/products');
                results.productsTest = {
                    success: true,
                    count: response.data?.length || 0,
                    data: response.data
                };
            } catch (error) {
                results.productsTest = {
                    success: false,
                    error: error.message
                };
            }

            // Test 3: Direct fetch to backend
            try {
                const response = await fetch('https://kle-ec.onrender.com/api/test');
                const data = await response.json();
                results.directTest = {
                    success: response.ok,
                    data: data
                };
            } catch (error) {
                results.directTest = {
                    success: false,
                    error: error.message
                };
            }

        } catch (error) {
            console.error('Test error:', error);
        } finally {
            setLoading(false);
            setTestResults(results);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-lg">Running API tests...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white py-10 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">API Test Results</h1>

                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">API Connection Test</h2>
                        <div className={`p-4 rounded ${testResults.apiTest?.success ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
                            <div className="font-semibold">
                                {testResults.apiTest?.success ? '✅ Success' : '❌ Failed'}
                            </div>
                            {testResults.apiTest?.data && (
                                <pre className="mt-2 text-sm overflow-auto">
                                    {JSON.stringify(testResults.apiTest.data, null, 2)}
                                </pre>
                            )}
                            {testResults.apiTest?.error && (
                                <div className="mt-2 text-red-600 dark:text-red-400">
                                    Error: {testResults.apiTest.error}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Products API Test</h2>
                        <div className={`p-4 rounded ${testResults.productsTest?.success ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
                            <div className="font-semibold">
                                {testResults.productsTest?.success ? '✅ Success' : '❌ Failed'}
                            </div>
                            {testResults.productsTest?.success && (
                                <div className="mt-2">
                                    Products found: {testResults.productsTest.count}
                                </div>
                            )}
                            {testResults.productsTest?.error && (
                                <div className="mt-2 text-red-600 dark:text-red-400">
                                    Error: {testResults.productsTest.error}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Direct Backend Test</h2>
                        <div className={`p-4 rounded ${testResults.directTest?.success ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
                            <div className="font-semibold">
                                {testResults.directTest?.success ? '✅ Success' : '❌ Failed'}
                            </div>
                            {testResults.directTest?.data && (
                                <pre className="mt-2 text-sm overflow-auto">
                                    {JSON.stringify(testResults.directTest.data, null, 2)}
                                </pre>
                            )}
                            {testResults.directTest?.error && (
                                <div className="mt-2 text-red-600 dark:text-red-400">
                                    Error: {testResults.directTest.error}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <button
                        onClick={runTests}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Run Tests Again
                    </button>
                </div>
            </div>
        </div>
    );
} 