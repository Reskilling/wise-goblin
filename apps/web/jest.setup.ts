import '@testing-library/jest-dom';
import { server } from './mocks/server';
import { mockUUID } from './test-utils/mock-uuid';

jest.mock('crypto', () => ({
  ...jest.requireActual<typeof import('crypto')>('crypto'),
  randomUUID: jest.fn().mockReturnValue(mockUUID),
}));

// The real @sentry/nextjs fails to load under Jest ("The URL must be of scheme file"),
// and tests should never report to Sentry anyway
jest.mock('@sentry/nextjs', () => ({
  addBreadcrumb: jest.fn(),
  captureException: jest.fn(),
  captureMessage: jest.fn(),
  setTag: jest.fn(),
  setTags: jest.fn(),
  setUser: jest.fn(),
  withServerActionInstrumentation: jest.fn(
    (_name: string, _options: unknown, callback: () => unknown) => callback(),
  ),
}));

// `cacheLife` and `cacheTag` throw outside of a Next.js `cacheComponents` build
jest.mock('next/cache', () => ({
  ...jest.requireActual<typeof import('next/cache')>('next/cache'),
  cacheLife: jest.fn(),
  cacheTag: jest.fn(),
}));

if (/\*|msw/.test(process.env.DEBUG ?? '')) {
  server.events.on('request:start', ({ request }) => {
    console.log('Outgoing:', request.method, request.url);
  });

  server.events.on('response:mocked', ({ request, response }) => {
    console.log(
      '%s %s received %s %s',
      request.method,
      request.url,
      response.status,
      response.statusText,
    );
  });
}

server.events.on('unhandledException', ({ request, error }) => {
  console.log('%s %s errored! See details below.', request.method, request.url);
  console.error(error);
});

jest.mock('next-auth', () => {
  const originalModule =
    jest.requireActual<typeof import('next-auth')>('next-auth');

  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn().mockReturnValue({
      auth: jest.fn(),
      signIn: jest.fn(),
      signOut: jest.fn(),
      handlers: {
        GET: jest.fn(),
        POST: jest.fn(),
      },
    }),
  };
});

beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'error',
  });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
