import { getCurrentUser } from '@/lib/auth-helpers';
import { redirect } from 'next/navigation';
import MachinesClient from './MachinesClient';

export default async function MachinesPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/');
  }

  return <MachinesClient user={user} />;
}
