import { getCurrentUser } from '@/lib/auth-helpers';
import AdminClient from './AdminClient';

export default async function AdminPage() {
  const user = await getCurrentUser();

  // Show the admin UI for demonstration purposes, bypassing strict redirects
  return <AdminClient user={user} />;
}
