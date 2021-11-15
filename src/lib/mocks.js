// PROJECTS
export const projects = [
	{
		id: '1',
		name: 'Test project 1',
		created_at: '2021-11-01T00:00:00.000Z'
	},
	{
		id: '2',
		name: 'Test project 2',
		created_at: '2021-11-01T00:00:00.000Z'
	},
	{
		id: '3',
		name: 'Test project 3',
		created_at: '2021-11-01T00:00:00.000Z'
	}
];

// USER
export const user = {
	email: 'github@crinkles.io',
	created: '2021-11-01T00:00:00.000Z',
	id: '1'
};

// SESSIONS
export function sessions() {
	const sessions = [];

	for (let i = 0; i < 1500; i++) {
		const days = Math.round(Math.random() * 200);
		const date = new Date();
		date.setDate(date.getDate() - days);
		sessions.push({
			version: '1.0.0',
			date: date.toISOString()
		});
	}

	return sessions;
}

// PAGE VISITS
const pages = [
	'/tickets',
	'/sessions/23412341234123412341234123412341234123421341234123412341234234',
	'/errors',
	'/',
	'/settings'
];
export function visits(sessions) {
	const visits = [];

	for (let i = 0; i < 5000; i++) {
		const sessionId = Math.round(Math.random() * sessions.length - 1);
		const page = Math.round(Math.random() * (pages.length - 1));

		visits.push({
			session: sessions[sessionId],
			path: pages[page]
		});
	}

	return visits;
}

// ERRORS & EVENTS
const status = ['open', 'archived'];
export function errors() {
	const items = [];

	for (let i = 0; i < 1500; i++) {
		const days = Math.round(Math.random() * 200);
		const date = new Date();
		const s = Math.round(Math.random() * 2);
		date.setDate(date.getDate() - days);
		const path = Math.round(Math.random() * (pages.length - 1));
		items.push({
			id: `${i}`,
			status: status[s <= 1 ? 0 : 1],
			error: {
				message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
				name: 'TypeError',
				stack:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nLorem ipsum dolor sit amet, consectetur adipiscing elit.\nLorem ipsum dolor sit amet, consectetur adipiscing elit.'
			},
			metadata: {
				agent: 'Chrome 85, MacOS 10.14',
				location: pages[path],
				version: '1.0.0'
			},

			timestamp: date.toISOString()
		});
	}

	return items;
}

// FEEDBACK ITEMS
const types = ['idea', 'bug', 'other'];
export function tickets() {
	const items = [];

	for (let i = 0; i < 500; i++) {
		const days = Math.round(Math.random() * 200);
		const date = new Date();
		date.setDate(date.getDate() - days);
		const type = Math.round(Math.random() * (types.length - 1));
		const path = Math.round(Math.random() * (pages.length - 1));
		items.push({
			id: `${i}`,
			open: true,
			type: types[type],
			location: pages[path],
			version: '1.0.0',
			agent: 'Chrome 85, MacOS 10.14',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed molestie urna tortor. Etiam mattis at magna sit amet mattis. Phasellus sed purus accumsan, laoreet nisl in, facilisis lacus. Mauris quis volutpat massa. Aenean tortor libero, rhoncus venenatis justo eget, consequat consequat massa. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer dui dui, lobortis at accumsan sit amet, efficitur sed eros.',
			email: 'github@crinkles.io',
			date: date.toISOString()
		});
	}

	return items;
}

const tags = ['nav', 'request', 'response', 'state'];
export function events() {
	const items = [];
	for (let i = 0; i < 10; i++) {
		const min = Math.round(Math.random() * 180);
		const date = new Date();
		date.setDate(date.getDate() - min);
		items.push({
			tag: tags[Math.round(Math.random() * 3)],
			timestamp: date.toISOString(),
			message:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed molestie urna tortor. Etiam mattis at magna sit amet mattis.'
		});
	}
	return items;
}
