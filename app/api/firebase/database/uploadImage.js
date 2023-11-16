import firebase_app from "../config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-hot-toast";

const storage = getStorage(firebase_app);

export default function uploadImages(filePath, newExtension = "webp") {
  return new Promise(async (resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*"; 
    input.multiple = true; 

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
        const loadingToast = toast.loading(`Uploading ${file.name}`);
        try {
          const image = new Image();
          image.src = URL.createObjectURL(file);

          image.onload = async () => {
            const maxWidth = 2000;
            let width = image.width;
            let height = image.height;

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

            canvas.toBlob(async (blob) => {
              const newFileName = `${file.name.replace(/\.[^/.]+$/, '')}.${newExtension}`;
              const storageRef = ref(storage, `${filePath}/${newFileName}`);

              try {
                await uploadBytes(storageRef, blob);
                const downloadURL = await getDownloadURL(storageRef);
                uploadedUrls.push(downloadURL);

                if (uploadedUrls.length === files.length) {
                  toast.success("All files uploaded successfully");
                  resolve(uploadedUrls);
                }
              } catch (error) {
                toast.error(`Error uploading ${file.name}`);
                console.error(`Error uploading ${file.name}:`, error);

                reject(error);
              } finally {
                toast.dismiss(loadingToast);
              }
            }, `image/${newExtension}`, 0.9); // 0.9 is the quality parameter
          };
        } catch (error) {
          toast.error(`Error uploading ${file.name}`);
          console.error(`Error uploading ${file.name}:`, error);

          reject(error);
        }
      }
    });

    input.click();
  });
}
