import { fsm } from '@crinkles/fsm';
import { writable } from 'svelte/store';

export function fsmStore(initial, states) {
	const machine = fsm(initial, states);
	const { subscribe, update } = writable({ state: machine.current, context: machine.context });

	machine.listen((state, context) => {
		update(() => ({ state, context }));
	});

	return { subscribe, send: machine.send };
}
