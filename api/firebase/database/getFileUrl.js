import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import firebase_app from "../config";

const storage = getStorage(firebase_app);

export default async function getFileUrl(path) {
  console.log(path)
  const imageRef = ref(storage, path);
  const downloadURL = await getDownloadURL(imageRef);

  return downloadURL
}