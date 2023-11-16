'use client'

export function getImageData(url, callback) {
  const img = new Image();

  img.src = url;

  img.onload = () => {
      const width = img.width;
      const height = img.height;

      const result = {
          width,
          height,
      };

      callback(result);
  };
}