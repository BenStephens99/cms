import firebase_app from "../config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-hot-toast";

const storage = getStorage(firebase_app);

export default function uploadImage(filePath) {

  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";

    input.addEventListener("change", async () => {
      const file = input.files[0];
      if (file) {
        try {
          const storageRef = ref(storage, `${filePath}/${file.name}`);
          await uploadBytes(storageRef, file);
          const downloadURL = await getDownloadURL(storageRef);
          toast.success(`${file.name} uploaded successfully`);
          resolve(downloadURL);
        } catch (error) {
          toast.error("Error uploading image");
          console.error("Error uploading image:", error);
          reject(error);
        }
      } else {
        toast.error("No file selected");
        reject("No file selected");
      }
    });

    input.click();
  });
}