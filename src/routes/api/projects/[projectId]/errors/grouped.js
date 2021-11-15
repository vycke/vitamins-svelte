import { DEFAULT_DAYS } from '$lib/constants';
import { paramsToObject } from '$lib/helpers/search';
import { errors } from '$lib/mocks';

export async function get({ query }) {
	const { days } = paramsToObject(query);
	const _errors = errors().sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));
	const errorsPerDay = [];

	for (let i = 0; i < (days || DEFAULT_DAYS); i++) {
		const day = new Date();
		day.setDate(day.getDate() - i);
		const str = day.toISOString().slice(0, 10);

		errorsPerDay.push({
			date: str,
			count: _errors.filter((s) => s.timestamp.includes(str)).length,
			day: i
		});
	}

	return {
		body: errorsPerDay
	};
}
