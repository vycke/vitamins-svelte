import pkg from '../../package.json';
export const version = pkg.version;

export const routes = [
	{ title: 'Overview', href: '/overview' },
	{ title: 'Tickets', href: '/tickets' },
	{ title: 'Sessions', href: '/sessions' },
	{ title: 'Errors', href: '/errors' },
	{ title: 'Settings', href: '/settings' }
];
