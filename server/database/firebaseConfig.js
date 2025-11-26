import admin from "firebase-admin";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

let serviceAccount;

// Load service account from environment (Render)
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
  // Local development loads file
  serviceAccount = JSON.parse(
    fs.readFileSync(new URL("./serviceAccountKey.json", import.meta.url))
  );
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    process.env.FIREBASE_DATABASE_URL ||
    "https://wheatongroup-f7e34-default-rtdb.firebaseio.com",
});

const database = admin.database();

export { admin, database };