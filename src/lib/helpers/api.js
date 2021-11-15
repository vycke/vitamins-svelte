function apiError(...args) {
	let res = { status: 500 };

	args.forEach((a) => {
		if (a.status >= 300) res = a;
	});

	return {
		status: res.status,
		error: new Error(`Something went wrong`)
	};
}

export async function sequential(calls) {
	const results = {};
	const props = {};
	const keys = Object.keys(calls);

	for (let i = 0; i < keys.length; i++) results[keys[i]] = await calls[keys[i]];
	if (!Object.values(results).every((r) => r.ok)) return apiError(...Object.values(results));

	for (let i = 0; i < keys.length; i++) props[keys[i]] = await results[keys[i]].json();

	return { props };
}
