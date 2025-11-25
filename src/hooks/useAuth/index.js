// src/hooks/useAuth.js
import {useEffect, useState} from 'react';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {getDatabase, ref, set} from 'firebase/database';

const mapRegisterError = error => {
  // Mapping kode error Firebase → pesan user-friendly
  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'Email sudah terdaftar, silakan gunakan email lain atau masuk.';
    case 'auth/invalid-email':
      return 'Format email tidak valid.';
    case 'auth/weak-password':
      return 'Password terlalu lemah, minimal 6 karakter.';
    default:
      return error.message || 'Gagal mendaftarkan akun, silakan coba lagi.';
  }
};

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, user => {
      // Jangan ganggu flow saat registrasi
      if (isRegistering) {
        console.log('⏸️ Registrasi sedang berjalan, skip update currentUser');
        setInitializing(false);
        return;
      }

      console.log('✅ Update currentUser:', user?.email || 'null');
      setCurrentUser(user || null);
      setInitializing(false);
    });

    return () => unsubscribe();
  }, [isRegistering]);

  const login = async (email, password) => {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email.trim(),
      password,
    );
    return userCredential.user;
  };

  const register = async ({email, password, nik, fullname}) => {
    const auth = getAuth();

    try {
      setIsRegistering(true);
      console.log('🔐 Mulai registrasi...');

      // 1. Buat akun Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );

      const user = userCredential.user;
      console.log('👤 User berhasil dibuat:', user.uid);

      // 2. Simpan profile ke Realtime Database
      const db = getDatabase();
      await set(ref(db, 'users/' + user.uid), {
        uid: user.uid,
        nik: nik || '',
        fullname: fullname || '',
        email: email.trim(),
        createdAt: new Date().toISOString(),
      });

      console.log('💾 Data user berhasil disimpan');

      // 3. Sign out setelah registrasi selesai
      await signOut(auth);
      console.log('🚪 User berhasil di-sign out');

      return user;
    } catch (error) {
      console.error('❌ Error saat registrasi:', error);

      // Lempar error dengan pesan yang sudah dimapping
      const friendlyMessage = mapRegisterError(error);
      const err = new Error(friendlyMessage);
      err.code = error.code;
      throw err;
    } finally {
      setTimeout(() => {
        setIsRegistering(false);
        console.log('✅ Flag registrasi di-reset');
      }, 300);
    }
  };

  const logout = async () => {
    const auth = getAuth();
    await signOut(auth);
    setCurrentUser(null);
  };

  return {
    currentUser,
    initializing,
    isRegistering, // untuk debugging
    login,
    register,
    logout,
  };
};
