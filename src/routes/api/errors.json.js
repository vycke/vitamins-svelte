import { errors } from '$lib/mocks';

export async function get() {
	const _errors = errors().sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));
	const errorsPerDay = [];

	for (let i = 0; i < 30; i++) {
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
		body: { errors: _errors, errorsPerDay }
	};
}
