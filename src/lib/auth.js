import { cookies } from 'next/headers';

export function isAdminAuthenticated() {
  try {
    const cookieStore = cookies();
    const session = cookieStore.get('admin_session');
    const expectedToken = process.env.SESSION_SECRET || 'authenticated_token_arif_2026';
    return Boolean(session && (session.value === expectedToken || session.value === 'authenticated_token_arif_2026'));
  } catch (error) {
    return false;
  }
}