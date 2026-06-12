import { redirect } from 'next/navigation';

export default function LoginPage() {
  // Authentication is now handled globally in the header via Google Popup.
  // We no longer use a dedicated login page.
  redirect('/');
}
