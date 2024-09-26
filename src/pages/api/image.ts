import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer"; // Import multer for file uploads
import { UploadImage } from "./utils/upload"; // Import your Upload service
import { NextApiHandler } from "next";

// Configure multer for file uploads
const upload = multer({ dest: "uploads/" }); // Save temporary uploads in 'uploads' folder

// Disable Next.js body parsing to handle multipart/form-data
export const config = {
  api: {
    bodyParser: false, // Disable Next.js body parsing
  },
};

// Multer middleware to handle file uploads
const multerUpload = upload.single("image");

// Middleware wrapper to work with Next.js
const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: any) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "POST") {
    try {
      // Use the runMiddleware function to run multerUpload in Next.js environment
      await runMiddleware(req, res, multerUpload);

      const file = (req as any).file; // Multer stores file info in req.file
      if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      console.log(file);

      // Upload the file to Google Drive using the UploadImage function
      const uploadedImageUrl = await UploadImage(file);

      if (uploadedImageUrl) {
        return res.status(200).json({
          message: "File uploaded successfully",
          url: uploadedImageUrl,
        });
      } else {
        return res
          .status(500)
          .json({ error: "Error uploading image to Google Drive" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

// Export the handler
export default handler;
