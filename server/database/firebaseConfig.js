import admin from "firebase-admin";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

// Load the service account JSON using fs instead of assert
const serviceAccount = JSON.parse(
  fs.readFileSync(new URL("./serviceAccountKey.json", import.meta.url))
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://wheatongroup-f7e34-default-rtdb.firebaseio.com",
});

const database = admin.database();

export { admin, database };