
import cloudinary from "../config/cloudinary.js";

 const uploadToCloudinary = async (
  fileBuffer,
  folder = "profile-images"
) => {
  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder,
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(fileBuffer);
    });

    return result;
  } catch (error) {
    console.log(error)
    throw new Error("Cloudinary upload failed");
  }
};

export default uploadToCloudinary