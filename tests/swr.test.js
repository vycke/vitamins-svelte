import { cache, swr } from '../src/lib/stores/swr';

// helper funtions
function delay(ms = 0) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

const data = { name: 'pokemon' };

global.fetch = jest.fn(() =>
	Promise.resolve({
		json: () => Promise.resolve(data)
	})
);

beforeEach(() => {
	fetch.mockClear();
	for (var member in cache) delete cache[member];
});

test('initial transition', async () => {
	let machine;

	swr('/test-1').subscribe((v) => {
		console.log({ v });
		machine = v;
	});
	expect(machine).toEqual({ data: null, errors: null, state: 'pending' });
	await delay(0);
	expect(machine).toEqual({ data: data, errors: null, state: 'success' });
});

test('two renders', async () => {
	console.log('----TEST 2');
	let machine1;
	let machine2;

	swr('/test-2').subscribe((v) => {
		machine1 = v;
	});
	swr('/test-2').subscribe((v) => {
		machine2 = v;
	});
	expect(machine1).toEqual({ data: null, errors: null, state: 'pending' });
	expect(machine2).toEqual({ data: null, errors: null, state: 'pending' });
	await delay(0);
	expect(machine1).toEqual({ data: data, errors: null, state: 'success' });
	expect(machine2).toEqual({ data: data, errors: null, state: 'success' });
});

test('unsubscribe', async () => {
	console.log('----TEST 3');
	let machine;

	const unsubscribe = swr('/test-3').subscribe((v) => {
		machine = v;
	});
	expect(machine).toEqual({ data: null, errors: null, state: 'pending' });
	await delay(0);
	expect(machine).toEqual({ data: data, errors: null, state: 'success' });
	unsubscribe();
	expect(cache['/test-3'].current).toBe('success');
	cache['/test-3'].send('STARTED');
	expect(cache['/test-3'].current).toBe('pending');
	expect(machine).toEqual({ data: data, errors: null, state: 'success' });
});
