import { user } from '$lib/mocks';

export async function post(request) {
	// TODO handle callback of actual fetch from login Supabase
	request.locals.user = JSON.stringify(user);
	return {};
}
