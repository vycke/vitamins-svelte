import { projects } from '$lib/mocks';

export async function get() {
	return { body: projects };
}

export async function post() {
	// TODO implement create
}
