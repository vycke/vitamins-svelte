export function format(iso) {
	return new Intl.DateTimeFormat('default').format(new Date(iso));
}
