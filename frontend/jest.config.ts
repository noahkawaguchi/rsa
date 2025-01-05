import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    // Handle static assets (e.g., CSS) or aliases (if needed)
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // global setup file
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};

export default config;
