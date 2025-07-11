import LandingPage from '../components/LandingPage';

import SafePath from '../components/SafePathClient';
import EmergencyHelplineScreen from '@/components/EmergencyHelpline';
import NearbyHelpScreen from '@/components/NearByHelp';
import TrustedContacts from '@/components/TrustedContacts';
import ReportPage from '../components/Report'; // Optional
// import '../app/page'; // Optional, depends on your setup






export default function HomePage() {
  return (
    <main>
      <LandingPage />
      <SafePath />
      <EmergencyHelplineScreen /> 
      <NearbyHelpScreen /> 
      <TrustedContacts /> 
      <ReportPage />
    </main>
  );
}