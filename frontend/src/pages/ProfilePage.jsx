import React, { useState, useRef } from 'react';
import { storage } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useAuth } from '../context/AuthContext';
import defaultAvatar from '../assets/default-avatar.svg'; // Use SVG avatar
import api from '../api/axios';

export default function ProfilePage() {
    const { token, user, setUser } = useAuth();
    const [photoURL, setPhotoURL] = useState(user?.profilePhoto || '');
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const fileInputRef = useRef();

    async function handleFileChange(e) {
        const file = e.target.files[0];
        if (!file) return;
        if (!user || !user._id) {
            setError('User not loaded. Please refresh and try again.');
            setUploading(false);
            return;
        }
        setUploading(true);
        setError('');
        setSuccess('');
        setProgress(0);
        // Show preview before upload
        const reader = new FileReader();
        reader.onload = (ev) => {
            if (ev.target.result && typeof ev.target.result === 'string') {
                setPhotoURL(ev.target.result);
            }
        };
        reader.readAsDataURL(file);
        try {
            const storageRef = ref(storage, `profile-photos/${user._id}/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed',
                (snapshot) => {
                    setProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
                },
                (err) => setError('Upload failed'),
                async () => {
                    const url = await getDownloadURL(uploadTask.snapshot.ref);
                    setPhotoURL(url);
                    // Update backend with new photo URL
                    await api.put('/users/profile-photo', { photoURL: url });
                    setSuccess('Profile photo updated!');
                    if (setUser) setUser({ ...user, profilePhoto: url }); // Update context
                }
            );
        } catch (err) {
            setError('Upload failed');
        } finally {
            setUploading(false);
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black text-black dark:text-white py-10 px-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 w-full max-w-md flex flex-col items-center border border-gray-200 dark:border-gray-800">
                <h1 className="text-2xl font-bold mb-6 dark:text-white">My Profile</h1>
                <div className="mb-6 flex flex-col items-center">
                    <img
                        src={photoURL && photoURL.startsWith('data:') ? photoURL : (photoURL ? photoURL : defaultAvatar)}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover border-4 border-blue-200 dark:border-blue-900 shadow mb-3"
                        onError={e => { e.target.onerror = null; e.target.src = defaultAvatar; }}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        disabled={uploading}
                    />
                    <button
                        className="btn-primary mt-2 px-6 py-2 text-base"
                        onClick={() => fileInputRef.current.click()}
                        disabled={uploading}
                    >
                        {uploading ? `Uploading... (${progress}%)` : 'Change Photo'}
                    </button>
                </div>
                {success && <div className="text-green-600 dark:text-green-400 mb-2">{success}</div>}
                {error && <div className="text-red-600 dark:text-red-400 mb-2">{error}</div>}
            </div>
        </div>
    );
} 