export function generateKey(codeLimit) {
	const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	const letters = ["a", "b", "c", "d", "e", "f"];
	const chars = ["/", ",", "?", ".", "!", "@"];
	const lettersUppercase = letters.map((letter) => letter.toUpperCase());
	const lettersLowercase = letters.map((letter) => letter.toLowerCase());
	console.log(lettersLowercase);
	console.log(lettersUppercase);
	const charPool = nums.concat(chars, lettersUppercase, lettersLowercase);

	let code = [];
	for (let i = 0; i < codeLimit; i++) {
		let randNum = Math.floor(Math.random() * charPool.length);
		code += charPool[randNum];
	}
	console.log(code);
	return code;
}
