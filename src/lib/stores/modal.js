import { fsmStore } from './util';

const config = {
	visible: { TOGGLE: 'notvisible' },
	notvisible: { TOGGLE: 'visible' }
};

export const modal = fsmStore('notvisible', config);
