import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

const uploadToCloudinary = async (
  fileBuffer,
  folder = "profile-images"
) => {

  try {

    const result =
      await new Promise(
        (resolve, reject) => {

          const stream =
            cloudinary.uploader.upload_stream(
              {
                folder,

                resource_type: "image",

                transformation: [
                  {
                    quality: "auto",
                    fetch_format: "auto",
                  },
                ],
              },

              (error, result) => {

                if (error) {
                  reject(error);

                } else {
                  resolve(result);
                }
              }
            );

          streamifier
            .createReadStream(fileBuffer)
            .pipe(stream);
        }
      );

    return result;

  } catch (error) {

    console.log(
      "Cloudinary Upload Error:",
      error
    );

    throw new Error(
      "Cloudinary upload failed"
    );
  }
};

export default uploadToCloudinary;