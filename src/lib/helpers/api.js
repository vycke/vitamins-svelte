export function apiError(...args) {
	let res = { status: 500 };

	args.forEach((a) => {
		if (a.status >= 300) res = a;
	});

	return {
		status: res.status,
		error: new Error(`Something went wrong`)
	};
}
