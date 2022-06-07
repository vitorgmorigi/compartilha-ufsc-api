/* eslint-disable @typescript-eslint/no-explicit-any */
import * as admin from "firebase-admin";

const BUCKET_NAME = "compartilha-ufsc.appspot.com";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const uploadImage = async (req: any, res: any, next: any) => {
  if (!req.files) return next();
  
  const bucket = admin.storage().bucket(BUCKET_NAME);

  const file = bucket.file(`images/${req.files[0].originalname}`);

  await file.save(req.files[0].buffer, {
    contentType: req.files[0].mimetype
  }).catch(err => {
    console.error("Upload bad!", err);
    
    return next(err);
  });

  await file.makePublic();

  res.locals.firebaseUrl = `https://storage.googleapis.com/${BUCKET_NAME}/images/${req.files[0].originalname}`;

  return next();
};