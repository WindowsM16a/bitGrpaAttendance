import { generateKey } from "./numGen.js";

const dom = {
	className: document.querySelector("#class"),
	form: document.querySelector("#form"),
	imgContainer: document.querySelector(".imgContainer"),
	loginBtn: document.querySelector("#login"),
	generateBtn: document.querySelector("#generate"),
};

const su = {
	email: document.querySelector("#email"),
	password: document.querySelector("#password"),
};

const qrCodeSize = "200";

const scriptUrl =
	"https://script.google.com/macros/s/AKfycbzNIxEnGmKem4SNw1Eb7Bw15HCWBa09Q4uBa7oJvtDSvyJti4qZkuFOTAERqXkKEI8Y/exec";

document.addEventListener("DOMContentLoaded", () => {
	// prevent normal form submission
	if (dom.form) {
		dom.form.addEventListener("submit", (e) => e.preventDefault());
	}

	// login button
	// if (dom.loginBtn) {
	// 	dom.loginBtn.addEventListener("click", verifySu);
	// }

	// on the QR-code page: generate and show code
	if (dom.imgContainer && dom.className) {
		dom.generateBtn.addEventListener("click", displayCode);
	}
});

// function verifySu(e) {
// 	e.preventDefault();
// 	if (su.email.value === "adminShayne" && su.password.value === "myPassword") {
// 		window.location.href = "./qrCode.html";
// 	} else {
// 		alert("Wrong credentials");
// 	}
// }

async function generateCode() {
	const classValue = dom.className.value;
	const fullUrl = `${scriptUrl}?class=${encodeURIComponent(classValue)}`;
	try {
		const res = await fetch(fullUrl);
		const data = await res.json();
		const qrUrl = `https://quickchart.io/qr?text=${encodeURIComponent(
			data.formUrl
		)}&size=${qrCodeSize}`;
		return qrUrl;
	} catch (err) {
		console.error("QR generation error:", err);
		return "";
	}
}

function displayCode() {
	generateCode().then((qrUrl) => {
		if (!qrUrl) return;
		dom.imgContainer.innerHTML = "";
		const img = document.createElement("img");
		img.src = qrUrl;
		img.alt = "QR code for the lesson's attendance";
		img.style.borderRadius = "0.3rem";
		dom.imgContainer.appendChild(img);
	});
}

fetch("/api/send-sms", {
	method: "POST",
	headers: { "Content-Type": "application/json" },
	body: JSON.stringify({
		to: "+19704108212",
		body: generateKey(6),
	}),
})
	.then((res) => res.json())
	.then((data) => {
		if (data.sid) {
			alert("SMS sent successfully!");
		} else {
			alert("Error: " + data.error);
		}
	});
