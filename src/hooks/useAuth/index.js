import {useEffect, useState} from 'react';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import {getDatabase, ref, set} from 'firebase/database';

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  // Listener auth state
  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user || null);
      setInitializing(false);
    });

    return () => unsubscribe();
  }, []);

  // Login user
  const login = async (email, password) => {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email.trim(),
      password,
    );
    return userCredential.user;
  };

  // Register user baru + simpan ke database
  const register = async ({email, password, nik, fullname}) => {
    const auth = getAuth();

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email.trim(),
      password,
    );

    const user = userCredential.user;
    const db = getDatabase();

    await set(ref(db, 'users/' + user.uid), {
      uid: user.uid,
      nik: nik || '',
      fullname: fullname || '',
      email: email.trim(),
      createdAt: new Date().toISOString(),
    });

    return user;
  };

  return {
    currentUser,
    initializing,
    login,
    register,
  };
};
