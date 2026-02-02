import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import LocationBanner from './components/LocationBanner';
import SOSButton from './components/SOSButton';
import SafetyLocations from './components/SafetyLocations';
import SafetyTips from './components/SafetyTips';
import ThreatRecognition from './components/ThreatRecognition';
import AmbulanceFinder from './components/AmbulanceFinder';
import EmergencyContacts from './components/EmergencyContacts';
import MedicalProfile from './components/MedicalProfile';
import FakeCall from './components/FakeCall';
import LocationShare from './components/LocationShare';
import SafetyTimer from './components/SafetyTimer';
import { Shield } from 'lucide-react';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen pb-24">
        <Header />
        <LocationBanner />

        <main>
          {/* Hero Section */}
          <section className="py-8 px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-600 text-sm font-medium mb-4">
                <Shield className="w-4 h-4" />
                Your safety matters
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                Stay Safe, Stay{' '}
                <span className="bg-gradient-to-r from-purple-500 to-violet-500 bg-clip-text text-transparent">
                  Empowered
                </span>
              </h1>
              <p className="text-gray-500">
                Your complete safety companion with emergency SOS, location sharing, and instant help access.
              </p>
            </div>
          </section>

          {/* Safety Features Section */}
          <section className="py-8 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-purple flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                Quick Safety Actions
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                <FakeCall />
                <LocationShare />
                <SafetyTimer />
              </div>
            </div>
          </section>

          <SafetyLocations />
          <SafetyTips />
          <AmbulanceFinder />
          <ThreatRecognition />

          {/* Profile Section with Emergency Contacts */}
          <section className="py-8 px-4 bg-gradient-to-br from-violet-50/50 to-purple-50/50">
            <div className="max-w-7xl mx-auto">
              <EmergencyContacts />
            </div>
          </section>

          <MedicalProfile />

          {/* Footer */}
          <footer className="py-8 px-4 bg-white border-t border-purple-100">
            <div className="max-w-7xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full gradient-violet flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-purple-600">Shesphere</span>
              </div>
              <p className="text-gray-400 text-sm">
                Made with 💜 for women everywhere
              </p>
              <p className="text-gray-300 text-xs mt-2">
                © 2024 Shesphere. Emergency numbers: 181 (Women Helpline) | 100 (Police) | 108 (Ambulance)
              </p>
            </div>
          </footer>
        </main>

        <SOSButton />
      </div>
    </AppProvider>
  );
}

export default App;
