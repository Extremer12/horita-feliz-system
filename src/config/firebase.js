const firebaseConfig = {
    // Tus credenciales de Firebase aquí
    apiKey: "tu-api-key",
    authDomain: "tu-proyecto.firebaseapp.com",
    projectId: "tu-proyecto",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "tu-messaging-sender-id",
    appId: "tu-app-id"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();