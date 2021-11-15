import { DEFAULT_DAYS } from '$lib/constants';
import { paramsToObject } from '$lib/helpers/search';
import { sessions, visits } from '$lib/mocks';

const oneDay = 1000 * 60 * 60 * 24;

export async function get({ query }) {
	const { days } = paramsToObject(query);
	const _sessions = sessions();
	const _visits = visits(_sessions);
	const topVisitedPages = [];

	_visits.forEach((v) => {
		if (!v.session) return;
		const diffInTime = new Date() - new Date(v.session.date);
		const diffInDays = Math.round(diffInTime / oneDay);
		if (diffInDays > (days || DEFAULT_DAYS)) return;

		let page = topVisitedPages.find((p) => p.path === v.path);
		if (!page) topVisitedPages.push({ path: v.path, count: 1 });
		else page.count++;
	});

	return {
		body: topVisitedPages.sort((a, b) => (a.count < b.count ? 1 : -1))
	};
}
