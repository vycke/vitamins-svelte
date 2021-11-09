import { sessions, visits } from '$lib/mocks';

export async function get() {
	const _sessions = sessions();
	const _visits = visits(_sessions);
	const sessionsPerDay = [];
	const topVisitedPages = [];

	for (let i = 0; i < 30; i++) {
		const day = new Date();
		day.setDate(day.getDate() - i);
		const str = day.toISOString().slice(0, 10);

		sessionsPerDay.push({
			date: str,
			count: _sessions.filter((s) => s.date.includes(str)).length,
			day: i
		});
	}

	_visits.forEach((v) => {
		let page = topVisitedPages.find((p) => p.path === v.path);
		if (!page) topVisitedPages.push({ path: v.path, count: 1 });
		else page.count++;
	});

	return {
		body: {
			sessionsPerDay,
			topVisitedPages: topVisitedPages.sort((a, b) => (a.count < b.count ? 1 : -1))
		}
	};
}
