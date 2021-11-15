import pkg from '../../package.json';
export const version = pkg.version;

export const routes = [
	{ title: 'Overview', href: '/overview', icon: 'HomeIcon' },
	{ title: 'Errors', href: '/errors', icon: 'BugIcon' },
	{ title: 'Tickets', href: '/tickets', icon: 'TicketIcon' },
	{ title: 'Sessions', href: '/sessions', icon: 'ComputerIcon' },
	{ title: 'Settings', href: '/settings', icon: 'CogIcon' }
];

export const DEFAULT_SIZE = 5;
export const DEFAULT_DAYS = 30;
