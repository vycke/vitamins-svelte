import { fsm, send, assign } from '@crinkles/fsm';
import { fsmStore } from './util';

const states = {
	visible: {
		on: {
			REMOVED: 'notvisible',
			CREATED: 'visible'
		},
		entry: [
			assign((_c, values) => {
				return values;
			}),
			send('REMOVED', 6000)
		]
	},
	notvisible: {
		on: {
			CREATED: 'visible'
		}
	}
};

const machine = fsm('notvisible', states);
export const toast = fsmStore(machine);

export function set(label) {
	machine.send('CREATED', 0, { label });
}

export function unset() {
	machine.send('REMOVED');
}
