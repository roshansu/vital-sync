// utils/compressImage.js

import sharp from "sharp";
 const compressImage = async (fileBuffer, fileSize) => {
  try {
    let finalBuffer = fileBuffer;

    // Compress only if image > 1MB
    if (fileSize > 1 * 1024 * 1024) {
      finalBuffer = await sharp(fileBuffer)
        .resize({ width: 1200 }) // optional resize
        .jpeg({ quality: 70 }) // compression quality
        .toBuffer();
    }

    return finalBuffer;
  } catch (error) {
    throw new Error("Image compression failed");
  }
};

export default compressImage