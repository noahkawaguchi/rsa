import { config } from 'dotenv';
config({ path: './.env.local' });

import '@testing-library/jest-dom/';
import { jest } from '@jest/globals';

jest.mock('./src/config', () => ({
  getApiUrl: jest.fn(() => process.env.VITE_API_URL),
}));
