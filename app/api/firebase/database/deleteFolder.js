import { getStorage, ref, listAll, deleteObject } from 'firebase/storage';
import firebase_app from "../config";
import { toast } from 'react-hot-toast';

const storage = getStorage(firebase_app);

export async function deleteFolder(directoryPath) {
  const storageRef = ref(storage, directoryPath);

  try {
    const results = await listAll(storageRef);

    await Promise.all(
      results.items.map(async (item) => {
        const itemRef = ref(storage, item.fullPath);
        await deleteObject(itemRef);
      })
    );

    await Promise.all(
      results.prefixes.map(async (prefix) => {
        const subfolderPath = prefix.fullPath;
        await deleteFolder(subfolderPath);
      })
    );

    toast.success(`${directoryPath} deleted successfully`);
  } catch (error) {
    toast.error('Failed to delete folder');
    console.error('Failed to delete folder:', error);
  }
}
