import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBpBfq0f--ypa_Oa9Xmv3dyP-rUPyhgVdk",
    authDomain: "mern-blog-3f586.firebaseapp.com",
    projectId: "mern-blog-3f586",
    storageBucket: "mern-blog-3f586.appspot.com",
    messagingSenderId: "477936559338",
    appId: "1:477936559338:web:89acf6b26d2d618742e393"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app); 