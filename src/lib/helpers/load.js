export async function loadHelper(fetch, url, keys) {
	const res = await fetch(url);
	if (res.ok) {
		const props = {};
		const result = await res.json();
		if (!Array.isArray(keys)) props[keys] = result;
		else keys.forEach((k) => (props[k] = result[k]));
		return { props };
	}

	return {
		status: res.status,
		error: new Error(`Something went wrong retrieving ${url}`)
	};
}
