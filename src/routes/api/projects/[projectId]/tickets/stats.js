import { tickets } from '$lib/mocks';

export async function get() {
	const _tickets = tickets();
	const result = {
		all: _tickets.length,
		idea: _tickets.filter((t) => t.type === 'idea').length,
		bug: _tickets.filter((t) => t.type === 'bug').length,
		other: _tickets.filter((t) => t.type === 'other').length
	};

	return {
		body: result
	};
}
