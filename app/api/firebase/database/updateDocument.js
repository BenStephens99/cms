import firebase_app from "../config";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);
export default async function updateDocument(collection, id, content) {
  let result = null;
  let error = null;

  try {
    const documentRef = doc(db, collection, id);
    result = await updateDoc(documentRef, {
      content
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}