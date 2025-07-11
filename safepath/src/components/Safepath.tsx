'use client';

import React, { useState } from 'react';
import styles from './SafePath.module.css';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

// Fix for Leaflet icons not showing
// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
//   shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
// });

const SafePath = () => {
  const [coords, setCoords] = useState<[number, number] | null>(null);
  const [destination, setDestination] = useState('');
  const [route, setRoute] = useState<{ path: [number, number][], isSafe: boolean }[]>([]);
  const [locationLabel, setLocationLabel] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported');
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoords([latitude, longitude]);
          fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
            .then(res => res.json())
            .then(({ display_name }) => setLocationLabel(display_name))
            .catch(() => setLocationLabel(`Lat: ${latitude}, Lon: ${longitude}`));
        },
        () => setError('Could not fetch location')
      );
    }
  };

  const handleFindRoute = () => {
    if (!coords || !destination) return;

    fetch(`https://nominatim.openstreetmap.org/search?q=${destination}&format=json`)
      .then(res => res.json())
      .then(results => {
        if (!results.length) {
          setError('Destination not found');
          return;
        }

        const destCoords: [number, number] = [parseFloat(results[0].lat), parseFloat(results[0].lon)];

        // Mock safety logic: Half route unsafe, half safe
        const midPoint: [number, number] = [
          (coords[0] + destCoords[0]) / 2,
          (coords[1] + destCoords[1]) / 2,
        ];

        const newRoute = [
          { path: [coords, midPoint], isSafe: false }, // Red (unsafe)
          { path: [midPoint, destCoords], isSafe: true }, // Green (safe)
        ];

        setRoute(newRoute);
        setError(null);
      })
      .catch(() => setError('Error finding route'));
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.heading}>SafePath Route Tracker</h2>

        <div className={styles.mapBox}>
          {coords ? (
            <MapContainer center={coords} zoom={14} style={{ height: '100%', width: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={coords}>
                <Popup>Your Location</Popup>
              </Marker>
              {route.map((segment, idx) => (
                <Polyline
                  key={idx}
                  positions={segment.path}
                  pathOptions={{ color: segment.isSafe ? 'green' : 'red', weight: 6 }}
                />
              ))}
            </MapContainer>
          ) : (
           <div>Click &quot;Get Location&quot; to begin</div>

          )}
        </div>

        <input
          type="text"
          placeholder="Enter destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className={styles.input}
        />
        <button onClick={handleGetLocation} className={styles.button}>Get Location</button>
        <button onClick={handleFindRoute} className={styles.button}>Find Safe Path</button>

        {locationLabel && <p className={styles.location}>📍 {locationLabel}</p>}
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

export default SafePath;










// "use client";
// import React, { useState } from 'react';
// import { MapPin, AlertTriangle, Clock, Shield, Zap } from 'lucide-react';

// const SafePath = () => {
//   // Simple state - like a light switch, either "safe" or "fast"
//   const [routeType, setRouteType] = useState('safe');
  
//   // Different times for different routes
//   const safeRouteTime = 15; // 15 minutes for safe route
//   const fastRouteTime = 8;  // 8 minutes for fast route
  
//   // Safety scores (out of 100)
//   const safeRouteScore = 95; // Very safe!
//   const fastRouteScore = 75;  // Less safe but faster
  
//   // Get the current time and score based on route type
//   const currentTime = routeType === 'safe' ? safeRouteTime : fastRouteTime;
//   const currentScore = routeType === 'safe' ? safeRouteScore : fastRouteScore;
  
//   // Function to switch between routes
//   const switchRoute = () => {
//     if (routeType === 'safe') {
//       setRouteType('fast');
//     } else {
//       setRouteType('safe');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-pink-50 p-4">
//       <div className="max-w-4xl mx-auto">
        
//         {/* Main Title */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-purple-800 mb-2">
//             Safe Route Prediction
//           </h1>
//           <p className="text-gray-600 text-lg">
//             Find the safest way to your destination!
//           </p>
//         </div>

//         {/* Main Card Container */}
//         <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-pink-200">
          
//           {/* Route Switcher */}
//           <div className="mb-8">
//             <div className="bg-gray-100 rounded-2xl p-6">
//               <div className="flex items-center justify-center gap-6">
                
//                 {/* Safe Route Button */}
//                 <button
//                   onClick={switchRoute}
//                   className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-lg transition-all ${
//                     routeType === 'safe' 
//                       ? 'bg-green-500 text-white shadow-lg' 
//                       : 'bg-white text-gray-600 border-2 border-gray-300'
//                   }`}
//                 >
//                   <Shield className="w-6 h-6" />
//                   Safe Route
//                 </button>

//                 <div className="text-2xl font-bold text-gray-400">OR</div>

//                 {/* Fast Route Button */}
//                 <button
//                   onClick={switchRoute}
//                   className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-2 transition-all ${
//                     routeType === 'fast' 
//                       ? 'bg-orange-500 text-white shadow-lg' 
//                       : 'bg-white text-gray-600 border-2 border-gray-300'
//                   }`}
//                 >
//                   <Zap className="w-6 h-6" />
//                   Fast Route
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Map Area */}
//           <div className="mb-8">
//             <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200">
//               <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
//                 Your Route Map
//               </h2>
              
//               {/* Simple Map Drawing */}
//               <div className="relative h-64 bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
                
//                 {/* Background Grid */}
//                 <div className="absolute inset-0 opacity-10">
//                   <svg width="100%" height="100%">
//                     <defs>
//                       <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
//                         <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#000" strokeWidth="1"/>
//                       </pattern>
//                     </defs>
//                     <rect width="100%" height="100%" fill="url(#grid)" />
//                   </svg>
//                 </div>

//                 {/* Route Line */}
//                 <svg className="absolute inset-0 w-full h-full">
//                   {/* Main Route Path */}
//                   <path
//                     d="M 40 220 Q 100 180 160 140 Q 220 100 280 80 Q 340 60 400 40"
//                     fill="none"
//                     stroke={routeType === 'safe' ? '#10B981' : '#F59E0B'}
//                     strokeWidth="8"
//                     strokeLinecap="round"
//                     className="drop-shadow-lg"
//                   />
                  
//                   {/* Danger Areas (only show red spots on safe route) */}
//                   {routeType === 'safe' && (
//                     <>
//                       <circle cx="180" cy="120" r="8" fill="#EF4444" />
//                       <circle cx="300" cy="70" r="8" fill="#F97316" />
//                     </>
//                   )}
//                 </svg>

//                 {/* Start Point */}
//                 <div className="absolute bottom-4 left-8">
//                   <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center shadow-lg">
//                     <MapPin className="w-8 h-8 text-white" />
//                   </div>
//                   <div className="text-center mt-1">
//                     <span className="bg-white px-2 py-1 rounded text-sm font-bold">START</span>
//                   </div>
//                 </div>

//                 {/* End Point */}
//                 <div className="absolute top-4 right-8">
//                   <div className="w-12 h-12 bg-purple-500 rounded-full flex iting-center justify-center shadow-lg">
//                     <MapPin className="w-8 h-8 text-white" />
//                   </div>
//                   <div className="text-center mt-1">
//                     <span className="bg-white px-2 py-1 rounded text-sm font-bold">END</span>
//                   </div>
//                 </div>

//                 {/* Warning Signs (only for safe route) */}
//                 {routeType === 'safe' && (
//                   <>
//                     <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
//                       <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
//                         <AlertTriangle className="w-6 h-6 text-white" />
//                       </div>
//                     </div>
//                     <div className="absolute top-1/4 right-1/4 transform -translate-x-1/2 -translate-y-1/2">
//                       <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
//                         <AlertTriangle className="w-6 h-6 text-white" />
//                       </div>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Route Information */}
//           <div className="mb-8">
//             <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
//               <div className="flex items-center justify-between">
                
//                 {/* Left Side - Route Info */}
//                 <div className="flex items-center gap-4">
//                   <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
//                     routeType === 'safe' ? 'bg-green-100' : 'bg-orange-100'
//                   }`}>
//                     {routeType === 'safe' ? (
//                       <Shield className="w-8 h-8 text-green-600" />
//                     ) : (
//                       <Zap className="w-8 h-8 text-orange-600" />
//                     )}
//                   </div>
//                   <div>
//                     <h3 className="text-2xl font-bold text-gray-800">
//                       {routeType === 'safe' ? 'Safe Route' : 'Fast Route'}
//                     </h3>
//                     <p className="text-lg text-gray-600">
//                       Safety Score: {currentScore}% 
//                       {routeType === 'safe' ? ' (Very Safe!)' : ' (Be Careful!)'}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Right Side - Time */}
//                 <div className="text-right">
//                   <div className="flex items-center gap-2">
//                     <Clock className="w-8 h-8 text-gray-500" />
//                     <div>
//                       <div className="text-3xl font-bold text-gray-800">
//                         {currentTime} min
//                       </div>
//                       <div className="text-sm text-gray-5">
//                         Estimated Time
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Simple Feature Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
//             {/* Safety Features Card */}
//             <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
//               <div className="flex items-center gap-3 mb-3">
//                 <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
//                   <Shield className="w-6 h-6 text-white" />
//                 </div>
//                 <h3 className="text-xl font-bold text-green-800">Safety First!</h3>
//               </div>
//               <p className="text-green-700 text-lg">
//                 This route uses well-lit streets and avoids dangerous areas
//               </p>
//             </div>

//             {/* Smart Technology Card */}
//             <div className="bg-purple-50 rounded-2xl p-6 border-2 border-purple-200">
//               <div className="flex items-center gap-3 mb-3">
//                 <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
//                   <AlertTriangle className="w-6 h-6 text-white" />
//                 </div>
//                 <h3 className="text-xl font-bold text-purple-800">Smart AI</h3>
//                 </div>
//               <p className="text-purple-700 text-lg">
//                 Our computer brain picks the best route for you!
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default SafePath;


