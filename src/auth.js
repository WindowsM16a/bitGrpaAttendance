import { error } from "console";
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

// this works
// fetch("/api/sendSms", {
// 	method: "POST",
// 	headers: { "Content-Type": "application/json" },
// 	body: JSON.stringify({
// 		body: generateKey(6),
// 	}),
// })
// 	.then((res) => res.json())
// 	.then((data) => {
// 		if (data.sid) {
// 			alert("SMS sent successfully!");
// 		} else {
// 			alert("Error: " + data.error);
// 		}
// 	});

function showMessage(message, divId) {
	const messageDiv = document.querySelector(divId);
	messageDiv.style.display = "flex";
	messageDiv.innerHTML = message;
	messageDiv.style.opacity = 1;
	setTimeout(() => {
		messageDiv.style.display = "none";
	}, 3000);
}

function isValidEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

document.addEventListener("DOMContentLoaded", () => {
	dom.loginBtn.addEventListener("click", (e) => {
		e.preventDefault();
		dom.loginBtn.disabled = true;
		dom.loginBtn.style.backgroundColor = "#2a2e46";
		dom.loginBtn.style.color = "#b3bdcc";
		dom.loginBtn.style.cursor = "not-allowed";
		const auth = getAuth();

		signInWithEmailAndPassword(auth, dom.email.value, dom.password.value)
			.then((userCredential) => {
				showMessage("Login Successful ✅", "#message");
				const user = userCredential.user;
				localStorage.setItem("loggedInUserId", user.uid);
				window.location.href = "./qrCode.html";
				dom.email.value = "";
				dom.password.value = "";
				dom.loginBtn.disabled = false;
				dom.loginBtn.style.backgroundColor = "#9e75f0";
				dom.loginBtn.style.color = "#f8fafc";
			})
			.catch((error) => {
				const errCode = error.code;
				if (errCode === "auth/invalid-credential") {
					showMessage("Incorrect Email or Password", "#message");
				} else {
					showMessage("Account does not exist. Contact admin", "#message");
				}
				dom.loginBtn.disabled = false;
				dom.loginBtn.style.cursor = "pointer";
				dom.loginBtn.style.backgroundColor = "#9e75f0";
				dom.loginBtn.style.color = "#f8fafc";
			});
	});
});
