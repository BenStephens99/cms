import { getFirestore, collection, getDocs } from "firebase/firestore";
import firebaseApp from "../config";

const db = getFirestore(firebaseApp);

export default async function getAllDocumentNames(collectionName) {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const documentNames = [];

  querySnapshot.forEach((doc) => {
    documentNames.push(doc.id);
  });

  return documentNames;
}
