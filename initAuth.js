// ./initAuth.js
import { init } from "next-firebase-auth"

const initAuth = () => {
  init({
    authPageURL: '/auth',
    appPageURL: '/',
    loginAPIEndpoint: '/api/login', // required
    logoutAPIEndpoint: '/api/logout', // required
    onLoginRequestError: (err) => {
      console.error(err)
    },
    onLogoutRequestError: (err) => {
      console.error(err)
    },
    firebaseAdminInitConfig: {
      credential: {
        projectId: 'tunecloud-cfbb1',
        clientEmail: 'firebase-adminsdk-abw3w@tunecloud-cfbb1.iam.gserviceaccount.com',
        // privateKey: process.env.FIREBASE_PRIVATE_KEY ? JSON.parse(process.env.FIREBASE_PRIVATE_KEY) : undefined,
        privateKey: process.env.FIREBASE_PRIVATE_KEY || "",
      },
      databaseURL: ""
    },
    firebaseClientInitConfig: {
      apiKey: "AIzaSyDCNDq0DZadbpeYgnpnqd8qhW1Vrwk99ss",
      authDomain: "tunecloud-cfbb1.firebaseapp.com",
      projectId: "tunecloud-cfbb1",
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: "238154614706",
      appId: process.env.FIREBASE_API_ID,
    },
    cookies: {
      name: 'TuneCloud',
      keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS,
      ],
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 24 * 1000,
      overwrite: true,
      path: '/',
      sameSite: 'strict',
      secure: true,
      signed: true,
    },
    onVerifyTokenError: (err) => {
      console.error(err)
    },
    onTokenRefreshError: (err) => {
      console.error(err)
    },
  })
}

export default initAuth
