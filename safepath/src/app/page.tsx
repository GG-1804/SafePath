import NearbyHelpScreen from '@/components/NearByHelp'
import EmergencyHelplineScreen from '@/components/EmergencyHelpline';
import TrustedContacts from '@/components/TrustedContacts';
import '../app/page';



export default function HomePage() {
  return (
    <main>
      <NearbyHelpScreen/>
      <EmergencyHelplineScreen/>
      <TrustedContacts/>

    </main>
  );
}