import test from 'node:test';
import assert from 'node:assert/strict';
import { isLocalDemoToken, isReadOnlyDemoRequest, maySendBearerTokenToBackend } from '../src/lib/demoMode.ts';

test('synthetic demo tokens cannot be forwarded to the backend', () => {
  const token = 'header.payload.local-demo';
  assert.equal(isLocalDemoToken(token), true);
  assert.equal(maySendBearerTokenToBackend(token), false);
  assert.equal(maySendBearerTokenToBackend('signed-backend-jwt'), true);
});

test('offline demo mode is read-only and defaults to GET', () => {
  assert.equal(isReadOnlyDemoRequest(undefined), true);
  assert.equal(isReadOnlyDemoRequest('get'), true);
  assert.equal(isReadOnlyDemoRequest('POST'), false);
  assert.equal(isReadOnlyDemoRequest('DELETE'), false);
});
