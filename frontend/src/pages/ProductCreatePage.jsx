import React, { useState, useRef } from 'react';
import { createProduct } from '../api/products';
import { useNavigate } from 'react-router-dom';
import { storage } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

export default function ProductCreatePage() {
    const [form, setForm] = useState({ name: '', description: '', price: '', category: '' });
    const [images, setImages] = useState([]); // File objects
    const [imageURLs, setImageURLs] = useState([]); // Firebase URLs
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const fileInputRef = useRef();
    const navigate = useNavigate();

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleImageChange(e) {
        const files = Array.from(e.target.files);
        setImages(files);
        setImageURLs([]);
        setUploadProgress([]);
    }

    async function handleImageUpload() {
        setUploading(true);
        setUploadProgress(Array(images.length).fill(0));
        const urls = [];
        for (let i = 0; i < images.length; i++) {
            const file = images[i];
            const storageRef = ref(storage, `product-images/${Date.now()}-${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            await new Promise((resolve, reject) => {
                uploadTask.on('state_changed',
                    (snapshot) => {
                        setUploadProgress(prev => {
                            const copy = [...prev];
                            copy[i] = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                            return copy;
                        });
                    },
                    (err) => reject(err),
                    async () => {
                        const url = await getDownloadURL(uploadTask.snapshot.ref);
                        urls.push(url);
                        resolve();
                    }
                );
            });
        }
        setImageURLs(urls);
        setUploading(false);
        return urls;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            let urls = imageURLs;
            if (images.length && imageURLs.length !== images.length) {
                urls = await handleImageUpload();
            }
            await createProduct({
                ...form,
                price: parseFloat(form.price),
                images: urls
            });
            navigate('/products');
        } catch (err) {
            setError('Failed to create product');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen w-full bg-white dark:bg-black text-black dark:text-white flex items-center justify-center py-10 px-4">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-black shadow-md rounded-lg p-8 w-full max-w-lg border border-gray-200 dark:border-white/10">
                <h1 className="text-2xl font-bold mb-6 dark:text-white">Add New Product</h1>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <div className="mb-4">
                    <label className="block mb-1 font-medium dark:text-white">Name</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required className="input-field" />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium dark:text-white">Description</label>
                    <textarea name="description" value={form.description} onChange={handleChange} required className="input-field" />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium dark:text-white">Category</label>
                    <input type="text" name="category" value={form.category} onChange={handleChange} required className="input-field" />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium dark:text-white">Product Images</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="input-field"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        disabled={uploading || loading}
                    />
                    <div className="flex flex-wrap gap-3 mt-3">
                        {images.map((img, idx) => (
                            <div key={idx} className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                <img src={URL.createObjectURL(img)} alt="preview" className="object-cover w-full h-full" />
                                {uploading && (
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs font-bold">
                                        {uploadProgress[idx] || 0}%
                                    </div>
                                )}
                            </div>
                        ))}
                        {imageURLs.map((url, idx) => (
                            <div key={idx + images.length} className="relative w-20 h-20 rounded-lg overflow-hidden border border-green-400 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                <img src={url} alt="uploaded" className="object-cover w-full h-full" />
                                <span className="absolute bottom-1 right-1 bg-green-500 text-white text-xs rounded px-1">✓</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mb-6">
                    <label className="block mb-1 font-medium dark:text-white">Price</label>
                    <input type="number" name="price" value={form.price} onChange={handleChange} required min="0" step="0.01" className="input-field" />
                </div>
                <button type="submit" className="btn-primary w-full" disabled={loading || uploading}>
                    {loading ? 'Creating...' : uploading ? 'Uploading Images...' : 'Create Product'}
                </button>
            </form>
        </div>
    );
} 