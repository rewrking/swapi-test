export function toRomanNumeral(value: number): string {
	const romanMap = {
		V: 5,
		IV: 4,
		I: 1,
	};
	let result: string = "";
	for (const key in romanMap) {
		result += key.repeat(Math.floor(value / romanMap[key]));
		value %= romanMap[key];
	}

	return result;
}
