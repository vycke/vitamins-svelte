import { fsmStore } from './util';

const states = {
	visible: {
		on: {
			TOGGLE: 'notvisible'
		}
	},
	notvisible: {
		on: {
			TOGGLE: 'visible'
		}
	}
};

export const modal = fsmStore('notvisible', states);
