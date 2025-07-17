import { getDatabase, ref, get } from 'firebase/database';
import { firebaseApp } from './firebaseConfig.js'; // Adjust path if needed

const pingFirebase = async () => {
  const db = getDatabase(firebaseApp);
  const pingRef = ref(db, '/'); 
  
  try {
    const snapshot = await get(pingRef);
    console.log('Firebase pinged successfully:', snapshot.exists());
  } catch (error) {
    console.error('Firebase ping failed:', error);
  }
};

export default pingFirebase;