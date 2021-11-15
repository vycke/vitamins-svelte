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

export const dayTabs = [
	{ label: '30 days', value: 30 },
	{ label: '90 days', value: 90 },
	{ label: '180 days', value: 180 }
];

export const errorFilters = [
	{ label: 'All', type: 'all', class: '' },
	{ label: 'Open', type: 'open', class: 'text-u-error' },
	{ label: 'Archived', type: 'archived', class: 'text-gray-300' }
];

export const ticketFilters = [
	{ label: 'All', type: 'all', class: '' },
	{ label: 'Ideas', type: 'idea', class: 'text-u-info' },
	{ label: 'Bugs', type: 'bug', class: 'text-u-error' },
	{ label: 'Other', type: 'other', class: 'text-gray-300' }
];
