// src/hooks/useProfile.js
import {useEffect, useState} from 'react';
import {getAuth, signOut} from 'firebase/auth';
import {getDatabase, ref, onValue, update, push, set} from 'firebase/database';

const initialProfile = {
  fullname: '',
  phone: '',
  email: '',
  nik: '',
  npwp: '',
};

const useProfile = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [photoBase64, setPhotoBase64] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ambil data profil user dari Firebase
  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      setLoading(false);
      setError('Silakan login terlebih dahulu');
      return;
    }

    const db = getDatabase();
    const userRef = ref(db, `users/${currentUser.uid}`);

    const unsubscribe = onValue(
      userRef,
      snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.val();

          setProfile({
            fullname: data.fullname || '',
            phone: data.phone || '',
            email: data.email || currentUser.email || '',
            nik: data.nik || '',
            npwp: data.npwp || '',
          });

          if (data.photo) {
            setPhotoBase64(data.photo);
          }
        }
        setLoading(false);
      },
      err => {
        console.log('Error fetching user:', err);
        setError('Gagal memuat profil');
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  // Simpan profil ke Firebase + buat notifikasi
  const saveProfile = async updatedProfile => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      throw new Error('Silakan login terlebih dahulu');
    }

    const db = getDatabase();
    const userRef = ref(db, `users/${currentUser.uid}`);

    const now = new Date();
    const timestamp = now.getTime();

    await update(userRef, {
      fullname: updatedProfile.fullname?.trim() || '',
      phone: updatedProfile.phone?.trim() || '',
      email: updatedProfile.email?.trim() || '',
      nik: updatedProfile.nik?.trim() || '',
      npwp: updatedProfile.npwp?.trim() || '',
      photo: photoBase64,
      updatedAt: now.toISOString(),
    });

    const notifRef = push(ref(db, `notifications/${currentUser.uid}`));
    await set(notifRef, {
      id: notifRef.key,
      type: 'success',
      title: 'Profil berhasil diperbarui',
      subtitle: `Update profil • ${now.toLocaleString('id-ID')}`,
      timestamp,
      category: 'profile-update',
      read: false,
    });
  };

  // Logout user
  const logout = async () => {
    const auth = getAuth();
    await signOut(auth);
  };

  return {
    profile,
    setProfile,
    photoBase64,
    setPhotoBase64,
    loading,
    error,
    saveProfile,
    logout,
  };
};

export default useProfile;
