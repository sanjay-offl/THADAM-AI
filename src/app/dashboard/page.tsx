import { getCurrentUser } from '@/lib/auth-helpers';
import { redirect } from 'next/navigation';
import DashboardClient from './DashboardClient';

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/');
  }

  return <DashboardClient user={user} />;
}
