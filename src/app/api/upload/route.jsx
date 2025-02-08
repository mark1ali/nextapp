import cloudinary from "cloudinary";
import multer from "multer";
import { promisify } from "util";
import fs from "fs";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Multer for file handling
const upload = multer({ dest: "/tmp" });
const uploadMiddleware = promisify(upload.single("file"));


// **POST request to add a new user**
export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const tempFilePath = path.join("/tmp", file.name);
    await writeFile(tempFilePath, buffer);

    // Upload to Cloudinary
    const result = await cloudinary.v2.uploader.upload(tempFilePath, {
      folder: "next_uploads",
    });

    return NextResponse.json({ url: result.secure_url }, { status: 200 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload" }, { status: 500 });
  }
}

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   try {
//     await uploadMiddleware(req, res);

//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     // Upload file to Cloudinary
//     const result = await cloudinary.v2.uploader.upload(req.file.path, {
//       folder: "nextjs_uploads", // Change this folder name if needed
//     });

//     // Remove temp file
//     fs.unlinkSync(req.file.path);

//     return res.status(200).json({ url: result.secure_url });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// }

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
