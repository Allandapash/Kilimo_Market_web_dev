
import BrowsePage from '@/components/browse-page';
import { getProduceListings } from '@/lib/data';
import { cookies } from 'next/headers';
import FarmerDashboard from './farmer-dashboard';
import { UserRole } from '@/context/auth-context';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function getUserRoleFromCookie(): UserRole | null {
    const cookieStore = cookies();
    const userCookie = cookieStore.get('mavunolink-africa-user');
    if (!userCookie) {
        return null;
    }
    try {
        const userData = JSON.parse(userCookie.value);
        return userData.role;
    } catch (e) {
        return null;
    }
}


export default async function DashboardPage() {
  const role = getUserRoleFromCookie();

  // If user is a farmer, show their dedicated dashboard
  if (role === UserRole.Farmer) {
      return <FarmerDashboard />;
  }
  
  // For any other logged in user (or guests), redirect them to the marketplace
  redirect('/marketplace');
}
