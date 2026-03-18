import multer from "multer";
import multerS3 from "multer-s3";
import s3Client from "../config/s3Config.js";
import path from "path";

// Configure multer for S3 uploads
const upload = multer({

  // Configure storage for S3 uploads
  storage: multerS3({

    // S3 client
    s3: s3Client,
    // S3 bucket name
    bucket: process.env.AWS_S3_BUCKET_NAME || "staynest-uploads",
    // S3 content type
    contentType: multerS3.AUTO_CONTENT_TYPE,
    // S3 metadata
    metadata: function (req, file, cb) {
      if (!req.user) {
        console.error("UPLOAD_ERROR: req.user is undefined in multer metadata");
        return cb(new Error("User not authenticated for upload"));
      }
      const metadata = { 
        uploadedBy: String(req.user.id), 
        originalname: file.originalname, 
        uploadedAt: new Date().toISOString() 
      };
      console.log("UPLOAD_METADATA:", metadata);
      cb(null, metadata);
    },
    // S3 key
    key: function (req, file, cb) {
      // Generate a unique filename for the uploaded file
      // Date.now() will give the current time in milliseconds
      // path.basename(file.originalname) will give the name of the file
      const fileName = `${Date.now()}_${path.basename(file.originalname)}`;

      // this callback function will be called when the file is uploaded to S3
      // the first argument is the error (null if no error)
      // the second argument is the key (the path where the file will be stored in the S3 bucket)
      cb(null, `boardings/${fileName}`);
    },
  }),
  // File filter
  fileFilter: (req, file, cb) => {
    // Allowed file types
    const filetypes = /jpeg|jpg|png|webp/;
    // Check if the file type is allowed , it will check the type/subtype (e.g. image/jpeg)
    const mimetype = filetypes.test(file.mimetype);
    // Check if the file extension is allowed
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // If the file type and extension are allowed, return true
    if (mimetype && extname) {
      return cb(null, true);
    }
    // If the file type or extension is not allowed, return an error
    cb(new Error("Only images (jpeg, jpg, png, webp) are allowed"));
  },
  // File size limit
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

export default upload;
