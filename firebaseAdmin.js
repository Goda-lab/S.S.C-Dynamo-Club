const admin = require("firebase-admin");
require('dotenv').config();

// Load Firebase service account key from environment variable
const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://sscdynamoclub-c9eef.firebaseio.com",
  });
}

module.exports = admin;