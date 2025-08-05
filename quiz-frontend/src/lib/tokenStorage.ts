import { cookies } from 'next/headers';

export async function getTokenFromCookie() {
  const token = (await cookies()).get('auth_token')?.value;
  return token || null;
}
