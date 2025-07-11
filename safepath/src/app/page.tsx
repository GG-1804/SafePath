import LandingPage from '../components/LandingPage';

import SafePath from '../components/SafePathClient';
// import EmergencyHelp from '../components/EmergencyHelp';
// import NearbyHelp from '../components/NearbyHelp';
// import TrustedContacts from '../components/TrustedContacts';
import ReportPage from '../components/Report'; // Optional
// import '../app/page'; // Optional, depends on your setup






export default function HomePage() {
  return (
    <main>
      <LandingPage />
      <SafePath />
      {/* <EmergencyHelp /> */}
      {/* <NearbyHelp /> */}
      {/* <TrustedContacts /> */}
      <ReportPage />
    </main>
  );
}