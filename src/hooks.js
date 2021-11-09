import { parse } from 'cookie';

function getUser(cookie = '') {
	return JSON.parse(parse(cookie).user || '{}');
}

export async function handle({ request, resolve }) {
	request.locals.user = getUser(request.headers.cookie);
	const response = await resolve(request);
	const user = request.locals.user || null;
	response.headers['set-cookie'] = `user=${JSON.stringify(user)}; Path=/; HttpOnly`;
	return response;
}

export function getSession(request) {
	return { user: request.locals.user };
}

export function handleError({ error, request }) {
	// TODO integrate tracker
	console.log(error, request);
}
