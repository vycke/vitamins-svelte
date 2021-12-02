import { send, assign } from '@crinkles/fsm';
import { fsmStore } from './util';

const config = {
	visible: {
		CLOSED: 'invisible',
		OPENED: 'visible',
		_entry: [
			(_s, ctx, values) => assign({ ...ctx, ...values }),
			(_s, ctx) => send('CLOSED', ctx, 6000)
		]
	},
	invisible: { OPENED: 'visible' }
};

export const toast = fsmStore('invisible', config);
