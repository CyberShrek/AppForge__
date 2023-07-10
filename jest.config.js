export default {
    preset: 'ts-jest',
    roots: ["./src"],
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    transformIgnorePatterns: ['./node_modules/']
};