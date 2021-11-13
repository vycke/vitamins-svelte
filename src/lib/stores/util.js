import { writable } from 'svelte/store';

export function fsmStore(machine, ctx) {
	const state = writable(machine.current);
	const context = writable(ctx);
	machine.listen((_s, target) => {
		state.update(() => target);
		context.update(() => machine.context);
	});

	return { state, context };
}
