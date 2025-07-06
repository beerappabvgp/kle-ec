import api from '../api/axios';

export const testAPIConnection = async () => {
    try {
        console.log('Testing API connection...');

        // Test the API base URL
        const response = await api.get('/test');
        console.log('✅ API connection successful:', response.data);
        return true;
    } catch (error) {
        console.error('❌ API connection failed:', error.message);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
        return false;
    }
};

export const testProductsAPI = async () => {
    try {
        console.log('Testing products API...');

        const response = await api.get('/products');
        console.log('✅ Products API successful:', {
            status: response.status,
            count: response.data?.length || 0
        });
        return true;
    } catch (error) {
        console.error('❌ Products API failed:', error.message);
        return false;
    }
}; 