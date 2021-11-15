import { DEFAULT_SIZE } from '$lib/constants';
import { paramsToObject } from '$lib/helpers/search';
import { errors } from '$lib/mocks';

export async function get({ query }) {
	const { size } = paramsToObject(query);

	const _errors = errors()
		.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))
		.slice(0, size || DEFAULT_SIZE);

	return { body: _errors };
}
