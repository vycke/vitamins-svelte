import { errors } from '$lib/mocks';

export async function get() {
	const _errors = errors();
	const result = {
		all: _errors.length,
		open: _errors.filter((t) => t.status === 'open').length,
		archived: _errors.filter((t) => t.status === 'archived').length
	};

	return {
		body: result
	};
}
