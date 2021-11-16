import { concurrent } from './async';

// Helper to create the error return of API calls when multiple calls happen
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

// Specific function to handle multiple named fetch calls and convert the json
// for SSR
export async function combineCalls(calls) {
	const props = {};
	const keys = Object.keys(calls);
	const results = await concurrent(calls);
	if (!Object.values(results).every((r) => r.ok)) return apiError(...Object.values(results));
	for (let i = 0; i < keys.length; i++) props[keys[i]] = await results[keys[i]].json();
	return { props };
}
