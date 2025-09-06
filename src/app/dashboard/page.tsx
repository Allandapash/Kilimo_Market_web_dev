
import BrowsePage from '@/components/browse-page';
import { getProduceListings } from '@/lib/data';
import { cookies } from 'next/headers';
import FarmerDashboard from './farmer-dashboard';
import { UserRole } from '@/context/auth-context';

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
  const listings = await getProduceListings();
  const role = getUserRoleFromCookie();

  if (role === UserRole.Farmer) {
      return <FarmerDashboard />;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <BrowsePage listings={listings} />
    </div>
  );
}
