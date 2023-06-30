import firebase_app from "../config";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function setData(collectionName, documentName, data) {
  let result = null;
  let error = null;

  try {
    const documentRef = doc(db, collectionName, documentName);
    await setDoc(documentRef, data);
    result = documentName;
  } catch (e) {
    error = e;
  }

  return { result, error };
}
