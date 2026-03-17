export const uploadImages = (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No files uploaded" });
  }

  const imageUrls = req.files.map((file) => file.location);
  return res.status(200).json({
    message: "Images uploaded successfully",
    imageUrls,
  });
};