import { projects } from '$lib/mocks';

export async function get() {
	return { body: projects };
}
