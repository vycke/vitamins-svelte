import pkg from '../../package.json';
export const version = pkg.version;

export const routes = [
	{ title: 'Overview', href: '/overview', icon: 'HomeIcon' },
	{ title: 'Tickets', href: '/tickets', icon: 'TicketIcon' },
	{ title: 'Sessions', href: '/sessions', icon: 'ComputerIcon' },
	{ title: 'Errors', href: '/errors', icon: 'BugIcon' },
	{ title: 'Settings', href: '/settings', icon: 'CogIcon' }
];
