function decodeBase64Url(value) {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');

  try {
    return decodeURIComponent(
      atob(padded)
        .split('')
        .map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, '0')}`)
        .join('')
    );
  } catch {
    return atob(padded);
  }
}

export function parseJwt(token) {
  if (!token) {
    return null;
  }

  try {
    const [, payload] = token.split('.');
    if (!payload) {
      return null;
    }

    return JSON.parse(decodeBase64Url(payload));
  } catch {
    return null;
  }
}

export function getUserFromToken(token) {
  const payload = parseJwt(token);

  if (!payload?.sub) {
    return null;
  }

  return {
    email: payload.sub,
    role: payload.role ?? 'USER',
  };
}

export function isTokenExpired(token) {
  const payload = parseJwt(token);

  if (!payload?.exp) {
    return true;
  }

  return payload.exp * 1000 <= Date.now();
}
