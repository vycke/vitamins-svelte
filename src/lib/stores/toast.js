import { writable } from 'svelte/store';
import { fsm, send } from '@crinkles/fsm';

const states = {
	visible: {
		on: {
			REMOVED: 'notvisible',
			CREATED: 'visible'
		},
		entry: send('REMOVED', 6000)
	},
	notvisible: {
		on: {
			CREATED: 'visible'
		}
	}
};

const machine = fsm('notvisible', states);

export const toast = writable({ state: 'notvisible', label: '' });

machine.listen((_s, target) => {
	toast.update(() => ({ label: '', state: target }));
});

export function set(label) {
	machine.send('CREATED');
	toast.update(() => ({ label, state: machine.current }));
}

export function unset() {
	machine.send('REMOVED');
}
