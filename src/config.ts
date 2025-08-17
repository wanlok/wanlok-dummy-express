import dotenv from "dotenv";
dotenv.config();

export const port = process.env.PORT || 3000;
export const filePath = process.env.FILE_PATH || "/f";
export const fileUploadDirectory = process.env.FILE_UPLOAD_DIRECTORY || "files";
