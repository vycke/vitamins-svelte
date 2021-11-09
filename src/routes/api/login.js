import { user } from '$lib/mocks';

export function get(request) {
	// TODO handle callback of actual fetch from login Supabase
	request.locals.user = user;
	return {};
}
