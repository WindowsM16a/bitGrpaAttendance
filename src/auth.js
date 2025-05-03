import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import {
	getFirestore,
	setDoc,
	doc,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// keys
const apiKey = import.meta.env.VITE_API_KEY;
const authDomain = import.meta.env.VITE_AUTH_DOMAIN;
const projectId = import.meta.env.VITE_PROJECT_ID;
const storageBucket = import.meta.env.VITE_STORAGE_BUCKET;
const messagingSenderId = import.meta.env.VITE_MESSAGING_SENDER_ID;
const appId = import.meta.env.VITE_APP_ID;

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: apiKey,
	authDomain: authDomain,
	projectId: projectId,
	storageBucket: storageBucket,
	messagingSenderId: messagingSenderId,
	appId: appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const dom = {
	email: document.querySelector("#email"),
	password: document.querySelector("#password"),
	emailV: document.querySelector("#email").value,
	passwordV: document.querySelector("#password").value,
	loginBtn: document.querySelector("#login"),
};

document.addEventListener("DOMContentLoaded", () => {
	dom.loginBtn.addEventListener("click", (e) => {
		e.preventDefault();
		const auth = getAuth();

		signInWithEmailAndPassword(auth, email, password).then(
			(userCredential) => {}
		);
	});
});
