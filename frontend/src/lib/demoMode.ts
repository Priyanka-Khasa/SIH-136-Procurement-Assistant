export function isLocalDemoToken(token: string | null | undefined): boolean {
  return token?.endsWith('.local-demo') === true;
}

export function isReadOnlyDemoRequest(method: string | undefined): boolean {
  return (method || 'GET').toUpperCase() === 'GET';
}

export function maySendBearerTokenToBackend(token: string | null | undefined): boolean {
  return Boolean(token) && !isLocalDemoToken(token);
}
