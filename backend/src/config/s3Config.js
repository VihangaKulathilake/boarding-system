import { S3Client } from "@aws-sdk/client-s3";

// dotenv is used to load environment variables from .env file
// environment variables are the variables that are set in the environment where the application is running, example: AWS_ACCESS_KEY_ID
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Configure S3 client
console.log("S3_CONFIG_START:", {
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID ? "PRESENT" : "MISSING",
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ? "PRESENT" : "MISSING",
});

const s3Client = new S3Client({
  region: process.env.AWS_REGION || "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export default s3Client;
