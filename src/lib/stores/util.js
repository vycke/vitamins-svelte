import { fsm } from '@crinkles/fsm';
import { writable } from 'svelte/store';

export function fsmStore(initial, states) {
	const machine = fsm(initial, states);
	const { subscribe, update } = writable({ state: machine.current, context: machine.context });

	machine.listen((_s, target) => {
		update(() => ({
			state: target,
			context: machine.context
		}));
	});

	function dispatch(event, context) {
		machine.send(event, 0, context);
	}

	return { subscribe, dispatch };
}
