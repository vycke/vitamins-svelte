// Generic function to handle async calls in a named object
export async function concurrent(obj) {
	const keys = Object.keys(obj);
	return Promise.all(Object.values(obj)).then((values) => {
		const result = {};
		values.forEach((v, i) => {
			result[keys[i]] = v;
		});
		return result;
	});
}
