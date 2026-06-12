import { getCurrentUser } from '@/lib/auth-helpers';
import { redirect } from 'next/navigation';
import RewardsClient from './RewardsClient';

export default async function RewardsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/');
  }

  return <RewardsClient user={user} />;
}
