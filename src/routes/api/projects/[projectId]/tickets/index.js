import { DEFAULT_SIZE } from '$lib/constants';
import { paramsToObject } from '$lib/helpers/search';
import { tickets } from '$lib/mocks';

export async function get({ query }) {
	const { size, type, id } = paramsToObject(query);

	return {
		body: tickets()
			.sort((a, b) => (a.date < b.date ? 1 : -1))
			.filter((t) => {
				if (id) return t.id === id;
				return true;
			})
			.filter((t) => {
				if (type) return t.type === type;
				return true;
			})
			.slice(0, size || DEFAULT_SIZE)
	};
}

export async function post() {
	// TODO implement create
}
