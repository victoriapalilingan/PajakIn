import {useEffect, useState} from 'react';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {getDatabase, ref, set} from 'firebase/database';

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [justRegistered, setJustRegistered] = useState(false); // ⬅️ ADD

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, user => {
      // ⬅️ JIKA baru register, JANGAN auto-navigate ke Main
      if (justRegistered) {
        setInitializing(false);
        return;
      }

      setCurrentUser(user || null);
      setInitializing(false);
    });

    return () => unsubscribe();
  }, [justRegistered]);

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

    // ⬅️ set flag, agar root navigator TIDAK redirect ke Main
    setJustRegistered(true);

    await signOut(auth);

    return user;
  };

  return {
    currentUser,
    initializing,
    login,
    register,
    justRegistered,
  };
};
