export function format(iso) {
	return new Intl.DateTimeFormat('default').format(new Date(iso));
}

export function time(iso) {
	return iso.slice(11, 16);
}
