import firebase_app from "../config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-hot-toast";

const storage = getStorage(firebase_app);
const MAX_FILE_SIZE = 2 * 1024 * 1024; 

export default function uploadImage(filePath) {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/webp"; 

    input.addEventListener("change", async () => {
      const file = input.files[0];
      if (file) {
        const fileExtension = file.name.split(".").pop().toLowerCase();
        if (fileExtension !== "webp") {
          toast.error("Please select an image with the extension .webp");
          reject("Invalid file type");
          return;
        }

        if (file.size > MAX_FILE_SIZE) {
          toast.error("File size exceeds the limit of 2MB");
          reject("File size too large");
          return;
        }

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
