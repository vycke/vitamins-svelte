import { projects } from '$lib/mocks';

export async function get({ params }) {
	const project = projects.find((p) => p.id === params.projectId);
	return { body: project };
}

export async function patch() {
	// TODO implement update
}

export async function del() {
	// TODO implement delete
}
