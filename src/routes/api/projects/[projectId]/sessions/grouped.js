import { DEFAULT_DAYS } from '$lib/constants';
import { paramsToObject } from '$lib/helpers/search';
import { sessions } from '$lib/mocks';

export async function get({ query }) {
	const { days } = paramsToObject(query);
	const _sessions = sessions();
	const sessionsPerDay = [];

	for (let i = 0; i < (days || DEFAULT_DAYS); i++) {
		const day = new Date();
		day.setDate(day.getDate() - i);
		const str = day.toISOString().slice(0, 10);

		sessionsPerDay.push({
			date: str,
			count: _sessions.filter((s) => s.date.includes(str)).length,
			day: i
		});
	}

	return {
		body: sessionsPerDay
	};
}
