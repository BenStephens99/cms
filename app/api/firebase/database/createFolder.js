import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
import firebase_app from '../config';
import { toast } from 'react-hot-toast';

const storage = getStorage(firebase_app);

export default async function createFolder(folderPath) {
  try {
    // Create a placeholder file in the new folder
    const folderRef = ref(storage, `${folderPath}/.placeholder`);
    await uploadString(folderRef, '');
    toast.success(`${folderPath} created`)
    return true;
  } catch (error) {
    toast.error('Error');
    console.error('Failed to create folder:', error);
    return null;
  }
}