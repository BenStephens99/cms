import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
import firebase_app from '../config';

const storage = getStorage(firebase_app);

export default async function createFolder(folderPath) {
  try {
    // Create a placeholder file in the new folder
    const folderRef = ref(storage, `${folderPath}/.placeholder`);
    await uploadString(folderRef, '');
    return true;
  } catch (error) {
    console.error('Failed to create folder:', error);
    return null;
  }
}