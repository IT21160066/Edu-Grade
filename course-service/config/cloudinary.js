import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "ddeh0t6uq",
  api_key: "481861862233145",
  api_secret: "gm3R7ZIqC3dzXFzJyLmzcfBH3jc",
});

//api environment variable = CLOUDINARY_URL=cloudinary://481861862233145:gm3R7ZIqC3dzXFzJyLmzcfBH3jc@ddeh0t6uq

const file = "../assets/video.mp4";

async function run() {
  try {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "video",
    });
    console.log(`Result: ${result.secure_url}`);
  } catch (error) {
    console.log(error);
  }
}

run();
