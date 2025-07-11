'use client';

import React from 'react';
import { Shield, MapPin } from 'lucide-react';

const NearbyHelpScreen: React.FC = () => {
  const handleMarkerClick = (locationName: string): void => {
    console.log(`Navigating to nearest ${locationName}`);
  };

  return (
    <div className="min-h-screen px-4 py-8" style={{ backgroundColor: '#FDEFF3' }}>
      <div className="max-w-4xl mx-auto">
        {/* Page Heading */}
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Nearby Help
        </h1>

        {/* Map Container */}
        <div
          className="relative bg-gray-100 rounded-xl shadow-lg overflow-hidden"
          style={{ height: '500px' }}
        >
          {/* Mock Map Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50 opacity-60"></div>

          {/* Mock Street Pattern */}
          <div className="absolute inset-0">
            {/* Horizontal lines */}
            <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gray-300 opacity-40"></div>
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-300 opacity-40"></div>
            <div className="absolute top-3/4 left-0 w-full h-0.5 bg-gray-300 opacity-40"></div>

            {/* Vertical lines */}
            <div className="absolute top-0 left-1/4 w-0.5 h-full bg-gray-300 opacity-40"></div>
            <div className="absolute top-0 left-1/2 w-0.5 h-full bg-gray-300 opacity-40"></div>
            <div className="absolute top-0 left-3/4 w-0.5 h-full bg-gray-300 opacity-40"></div>
          </div>

          {/* Police Station Marker */}
          <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110"
            style={{ top: '35%', left: '30%' }}
            onClick={() => handleMarkerClick('Police Station')}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow duration-300"
              style={{ backgroundColor: '#5B4EC3' }}
            >
              <Shield size={24} />
            </div>
            <div className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded-md shadow-md text-sm font-medium text-gray-700 whitespace-nowrap">
              Police Station
            </div>
          </div>

          {/* Hotel Marker */}
          <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110"
            style={{ top: '65%', left: '70%' }}
            onClick={() => handleMarkerClick('Hotel')}
          >
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <MapPin size={24} />
            </div>
            <div className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded-md shadow-md text-sm font-medium text-gray-700 whitespace-nowrap">
              Hotel
            </div>
          </div>

          {/* Current Location Marker */}
          <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ top: '50%', left: '50%' }}
          >
            <div className="w-4 h-4 rounded-full bg-red-500 shadow-md animate-pulse"></div>
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded-md shadow-md text-xs font-medium text-gray-700 whitespace-nowrap">
              You are here
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Legend</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: '#5B4EC3' }}
              >
                <Shield size={14} />
              </div>
              <span className="text-sm text-gray-700">Police Station</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white">
                <MapPin size={14} />
              </div>
              <span className="text-sm text-gray-700">Hotel</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm text-gray-700">Your Location</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NearbyHelpScreen;
