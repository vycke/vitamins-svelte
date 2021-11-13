import { fsm } from '@crinkles/fsm';
import { fsmStore } from './util';

const states = {
	visible: {
		on: {
			CLOSE: 'notvisible'
		}
	},
	notvisible: {
		on: {
			OPEN: 'visible'
		}
	}
};

const machine = fsm('notvisible', states);
export const modal = fsmStore(machine);

export function trigger() {
	machine.current === 'visible' ? machine.send('CLOSE') : machine.send('OPEN');
}
