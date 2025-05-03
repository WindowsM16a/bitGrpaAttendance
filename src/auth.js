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
	loginBtn: document.querySelector("#login"),
};

function showMessage(message, divId) {
	const messageDiv = document.querySelector(divId);
	messageDiv.style.display = "block";
	messageDiv.innerHTML = message;
	messageDiv.style.opacity = 1;
	setTimeout(() => {
		dom.messageDiv.style.opacity = 0;
	}, 5000);
}

document.addEventListener("DOMContentLoaded", () => {
	dom.loginBtn.addEventListener("click", (e) => {
		e.preventDefault();
		const auth = getAuth();
		// function isValidEmail(email) {
		// 	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		// 	return emailRegex.test(email);
		// }
		// console.log(dom.email.value);
		// console.log(isValidEmail(dom.email.value));

		signInWithEmailAndPassword(auth, dom.email.value, dom.password.value).then(
			(userCredential) => {
				showMessage("ehhh", "message");
				const user = userCredential.user;
				localStorage.setItem("loggedInUserId", user.uid);
				window.location.href = "https://google.com";
			}
		);
	});
});
