import {getAuth} from 'firebase/auth';

export const getCurrentUser = () => {
  const auth = getAuth();
  return auth.currentUser || null;
};
export const getCurrentUserId = () => {
  const user = getCurrentUser();
  return user ? user.uid : null;
};
export const isAuthenticated = () => {
  return getCurrentUser() !== null;
};

export const onAuthStateChange = callback => {
  const auth = getAuth();
  return auth.onAuthStateChanged(callback);
};
