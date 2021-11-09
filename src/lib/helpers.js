export function getMax(arr, key) {
	let max = 0;
	arr.forEach((a) => {
		if (a[key] > max) max = a[key];
	});

	return max;
}

export function sum(arr, key) {
	let total = 0;
	arr.forEach((a) => (total += a[key]));
	return total;
}
