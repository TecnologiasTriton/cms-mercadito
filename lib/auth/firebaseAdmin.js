import * as admin from 'firebase-admin'
import 'firebase/firebase-functions'

const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY

const config = {
  privateKey: firebasePrivateKey.replace(/\\n/g, '\n'),
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_EMAIL
}

export default !admin.apps.length ? 
  admin.initializeApp({ credential: admin.credential.cert(config), databaseURL: process.env.FIREBASE_DATABASE_URL }) : 
  admin