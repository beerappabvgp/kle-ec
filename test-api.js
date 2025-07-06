const axios = require('axios');

const API_URL = 'https://kle-ec.onrender.com';

async function testAPI() {
    try {
        console.log('Testing API connection...');

        // Test health endpoint
        const healthResponse = await axios.get(`${API_URL}/health`);
        console.log('✅ Health check:', healthResponse.data);

        // Test API endpoint
        const apiResponse = await axios.get(`${API_URL}/api/test`);
        console.log('✅ API test:', apiResponse.data);

        // Test products endpoint
        const productsResponse = await axios.get(`${API_URL}/api/products`);
        console.log('✅ Products endpoint:', {
            status: productsResponse.status,
            count: productsResponse.data?.length || 0
        });

        console.log('\n🎉 All tests passed! API is working correctly.');

    } catch (error) {
        console.error('❌ API test failed:', error.message);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
    }
}

testAPI(); 