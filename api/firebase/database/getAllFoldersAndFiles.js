import { getStorage, ref, listAll } from 'firebase/storage';
import firebase_app from "../config";

const storage = getStorage(firebase_app);

export default async function getAllFoldersAndFiles(directoryPath) {
  const storageRef = ref(storage, directoryPath);

  try {
    const results = await listAll(storageRef);
    const folders = results.prefixes.map((prefix) => prefix.name);
    const files = results.items.map((item) => item.name);

    return { folders, files };
  } catch (error) {
    console.error('Failed to get folders and files:', error);
    return { folders: [], files: [] };
  }
}
