import { fsm, assign } from '@crinkles/fsm';
import { writable } from 'svelte/store';

// CACHE
export const cache = {};

// DEFAULT CONTEXT
const context = { data: null, errors: null };
// ACTIONS
const successEntry = (_s, ctx, data) => assign({ ...ctx, data, errors: null });
const errorEntry = (_s, ctx, errors) => assign({ ...ctx, errors, data: null });
const pendingEntry = (_s, ctx) => assign({ ...ctx, errors: null });
// CONFIG
const config = {
	init: { STARTED: 'pending' },
	pending: { FINISHED: 'success', FAILED: 'error', _entry: [pendingEntry] },
	success: { STARTED: 'pending', _entry: [successEntry] },
	error: { STARTED: 'pending', _entry: [errorEntry] }
};

// SWR function
export function swr(url) {
	if (!cache[url]) cache[url] = fsm('init', config, context);

	const { subscribe, set } = writable({}, () => {
		function update(state, { data, errors }) {
			set({ state, data, errors });
		}

		update(cache[url].current, cache[url].context);
		const remove = cache[url].listen(update);
		return () => remove();
	});

	async function refetch() {
		try {
			const success = cache[url].send('STARTED');
			if (!success) return;
			const response = await fetch(url);
			const data = await response.json();
			cache[url].send('FINISHED', data);
		} catch (e) {
			cache[url].send('FAILED', e);
		}
	}

	refetch();
	return { subscribe, refetch };
}
