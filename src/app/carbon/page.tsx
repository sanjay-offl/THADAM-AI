import { getCurrentUser } from '@/lib/auth-helpers';
import { redirect } from 'next/navigation';
import CarbonClient from './CarbonClient';

export default async function CarbonPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/');
  }

  return <CarbonClient user={user} />;
}
