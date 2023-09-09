import firebase_app from "../config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-hot-toast";

const storage = getStorage(firebase_app);
const MAX_FILE_SIZE = 2 * 1024 * 1024;

export default function uploadImages(filePath, newExtension = "webp") {
  return new Promise(async (resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*"; // Accept any image type
    input.multiple = true; // Allow multiple file selection

    input.addEventListener("change", async () => {
      const files = input.files;
      if (files.length === 0) {
        toast.error("No files selected");
        reject("No files selected");
        return;
      }

      const uploadedUrls = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        try {
          const image = new Image();
          image.src = URL.createObjectURL(file);

          image.onload = async () => {
            const maxWidth = 2000;
            let width = image.width;
            let height = image.height;

            // Check if the image width is greater than the maximum width
            if (width > maxWidth) {
              const scaleFactor = maxWidth / width;
              width = maxWidth;
              height *= scaleFactor;
            }

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(image, 0, 0, width, height);

            // Convert the resized image to WebP format
            canvas.toBlob(async (blob) => {
              const newFileName = `${file.name.replace(/\.[^/.]+$/, '')}.${newExtension}`;
              const storageRef = ref(storage, `${filePath}/${newFileName}`);
              await uploadBytes(storageRef, blob);
              const downloadURL = await getDownloadURL(storageRef);
              uploadedUrls.push(downloadURL);

              if (uploadedUrls.length === files.length) {
                toast.success("All files uploaded successfully");
                resolve(uploadedUrls);
              }
            }, `image/${newExtension}`, 0.9); // 0.9 is the quality parameter, adjust as needed
          };
        } catch (error) {
          toast.error(`Error uploading ${file.name}`);
          console.error(`Error uploading ${file.name}:`, error);

          // If an error occurs, reject the promise immediately
          reject(error);
        }
      }
    });

    input.click();
  });
}
