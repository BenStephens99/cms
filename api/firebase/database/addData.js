import { toast } from "react-hot-toast";
import firebase_app from "../config";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function addData(collectionName, data) {
  let result = null;
  let error = null;

  try {
    const collectionRef = collection(db, collectionName);
    const docRef = await addDoc(collectionRef, data);
    result = docRef.id; 
  } catch (e) {
    error = e;
  }

  return { result, error };
}
