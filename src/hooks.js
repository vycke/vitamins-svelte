import cookie from 'cookie';

export async function handle({ request, resolve }) {
	const cookies = cookie.parse(request.headers.cookie || '');
	request.locals.user = cookies.user;
	const response = await resolve(request);
	response.headers['set-cookie'] = `user=${request.locals.user || ''}; Path=/; HttpOnly`;

	return response;
}

export async function getSession(request) {
	return {
		user: JSON.parse(request.locals.user || '{}')
	};
}

export function handleError({ error, request }) {
	// TODO integrate tracker
	console.log(error, request);
}
