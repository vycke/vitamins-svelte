import vercel from '@sveltejs/adapter-vercel';

export default {
	kit: {
		adapter: vercel(),
		target: '#svelte',
		vite: {
			server: {
				fs: {
					// Allow serving files from one level up to the project root
					allow: ['..']
				}
			}
		}
	}
};
