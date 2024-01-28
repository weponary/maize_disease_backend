import multer from "multer";
import fs from "fs";

interface IFileUploader {
  upload(filter: any): multer.Multer | any;
}

class LocalFileUploader implements IFileUploader {
  private storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
      const path = "./../python_maize_disease_detection_backend/uploads";
      fs.mkdirSync(path, { recursive: true });
      cb(null, path);
    },
    filename: (_req, file, cb) => {
      cb(
        null,
        `${Date.now().toString()}-name-${file.originalname
          .split(" ")
          .join("-")}`
      );
    },
  });

  upload(filter: any) {
    return multer({ storage: this.storage, fileFilter: filter });
  }
}

export const uploadLocal = (filter: any = null): multer.Multer => {
  return new LocalFileUploader().upload(filter);
};
