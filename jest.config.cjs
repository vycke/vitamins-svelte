module.exports = {
	testMatch: ['**/?(*.)+(spec|test).js'],
	collectCoverageFrom: ['src/**/*.js'],
	testPathIgnorePatterns: ['/node_modules/'],
	transform: {
		'^.+\\.js$': 'ts-jest'
	}
};
