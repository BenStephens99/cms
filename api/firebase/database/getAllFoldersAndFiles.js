import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import firebase_app from "../config";

const storage = getStorage(firebase_app);

export default async function getAllFoldersAndFiles(directoryPath) {
  const storageRef = ref(storage, directoryPath);

  try {
    const results = await listAll(storageRef);

    const folders = results.prefixes.map((prefix) => prefix.name);

    const files = results.items.map((item) => item.name);

    const imageExtensions = /\.(png|jpe?g|webp|gif|bmp|svg|tiff?|ico|raw|psd)$/i;

    const imageFiles = [];
    const filteredFiles = files.filter((fileName) => {
      if (imageExtensions.test(fileName)) {
        imageFiles.push({
          name: fileName,
          url: null, 
        });
        return false;
      }
      return true;
    });

    await Promise.all(
      imageFiles.map(async (imageFile) => {
        const fileRef = ref(storage, `${directoryPath}/${imageFile.name}`);
        imageFile.url = await getDownloadURL(fileRef);
      })
    );

    return { folders, files: filteredFiles, images: imageFiles };
  } catch (error) {
    console.error('Failed to get folders, files, and images:', error);
    return { folders: [], files: [], images: [] };
  }
}
