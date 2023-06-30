import firebase_app from "../config";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function deleteDocument(collectionName, documentId) {
  let result = null;
  let error = null;

  try {
    const docRef = doc(db, collectionName, documentId);
    await deleteDoc(docRef);
    result = "Document successfully deleted!";
  } catch (e) {
    error = e;
  }

  return { result, error };
}
