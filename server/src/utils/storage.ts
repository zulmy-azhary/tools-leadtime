import multer from "multer";
// FILE STORAGE
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/assets");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  }
});
const upload = multer({ storage });

export { storage, upload };
