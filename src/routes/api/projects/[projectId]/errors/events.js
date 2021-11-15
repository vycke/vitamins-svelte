import { events } from '$lib/mocks';

export async function get() {
	return { body: events().sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1)) };
}
