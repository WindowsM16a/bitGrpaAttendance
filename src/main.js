import { generateKey } from "./numGen.js";

const dom = {
	className: document.querySelector("#class"),
	form: document.querySelector("#form"),
	imgContainer: document.querySelector(".imgContainer"),
	loginBtn: document.querySelector("#login"),
	generateBtn: document.querySelector("#generate"),
};

const qrCodeSize = "200";

const editors = ["aburgars@gmail.com", "Kofigah105augustine@gmail.com", "nanadonaldsomuah18@gmail.com"];
const editorsParam = encodeURIComponent(editors.join(","));

const scriptUrl =
	"https://script.google.com/macros/s/AKfycbzIGuIrVzHf33Aoo8uhxXrjgdRws6tzoN2nD3faC5yK6ai9CyzDbwXWKySjdcZode9J/exec";

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

async function generateCode() {
	const classValue = dom.className.value;
	const fullUrl = `${scriptUrl}?class=${encodeURIComponent(
		classValue
	)}&editors=${editorsParam}`;
	console.log(fullUrl);
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
	dom.generateBtn.disabled = true;
	dom.generateBtn.style.color = "#b3bdcc";
	dom.generateBtn.style.backgroundColor = "#2a2e46";
	dom.generateBtn.style.cursor = "not-allowed";
	generateCode().then((qrUrl) => {
		if (!qrUrl) return;
		dom.imgContainer.innerHTML = "";
		const img = document.createElement("img");
		img.src = qrUrl;
		img.alt = "QR code for the lesson's attendance";
		img.style.borderRadius = "0.3rem";
		dom.imgContainer.appendChild(img);
		dom.generateBtn.disabled = false;
		dom.generateBtn.style.color = "#f8fafc";
		dom.generateBtn.style.backgroundColor = "#9e75f0";
		dom.generateBtn.style.cursor = "pointer";
	});
}
