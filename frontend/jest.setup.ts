import '@testing-library/jest-dom/';
import { jest } from '@jest/globals';

jest.mock('./src/config', () => ({
  getApiUrl: jest.fn(() => 'http://127.0.0.1:5000'),
}));

