import { getStorage, ref, deleteObject } from 'firebase/storage';
import firebase_app from "../config";
import { toast } from 'react-hot-toast';

const storage = getStorage(firebase_app);

export async function deleteFile(path) {
  const imageRef = ref(storage, path);

  try {
    await deleteObject(imageRef);
    toast.success(`${path} deleted successfully`);
  } catch (error) {
    console.error('Failed to delete image:', error);
  }
}