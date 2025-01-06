import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy', // For when importing CSS files
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // global setup file
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};

export default config;
