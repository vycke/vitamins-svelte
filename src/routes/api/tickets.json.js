import { tickets } from '$lib/mocks';

export async function get() {
	return {
		body: tickets().sort((a, b) => (a.date < b.date ? 1 : -1))
	};
}
