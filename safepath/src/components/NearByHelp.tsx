'use client';

import React from 'react';
import { Shield, MapPin } from 'lucide-react';
import './NearbyHelp.css';

const NearbyHelpScreen: React.FC = () => {
  const handleMarkerClick = (locationName: string): void => {
    console.log(`Navigating to nearest ${locationName}`);
  };

  return (
    <div className="nearby-container">
      <div className="nearby-wrapper">
        <h1 className="nearby-title">Nearby Help</h1>

        {/* Map */}
        <div className="map-area">
          <div className="map-gradient" />
          <div className="map-grid">
            <div className="line-horizontal top-1-4" />
            <div className="line-horizontal top-1-2" />
            <div className="line-horizontal top-3-4" />
            <div className="line-vertical left-1-4" />
            <div className="line-vertical left-1-2" />
            <div className="line-vertical left-3-4" />
          </div>

          {/* Police Station */}
          <div className="marker" style={{ top: '35%', left: '30%' }} onClick={() => handleMarkerClick('Police Station')}>
            <div className="marker-icon police-bg">
              <Shield size={24} />
            </div>
            <div className="marker-label">Police Station</div>
          </div>

          {/* Hotel */}
          <div className="marker" style={{ top: '65%', left: '70%' }} onClick={() => handleMarkerClick('Hotel')}>
            <div className="marker-icon hotel-bg">
              <MapPin size={24} />
            </div>
            <div className="marker-label">Hotel</div>
          </div>

          {/* Your Location */}
          <div className="marker-center" style={{ top: '50%', left: '50%' }}>
            <div className="current-location" />
            <div className="marker-center-label">You are here</div>
          </div>
        </div>

        {/* Legend */}
        <div className="legend-box">
          <h3 className="legend-title">Legend</h3>
          <div className="legend-items">
            <div className="legend-item">
              <div className="legend-icon police-bg">
                <Shield size={14} />
              </div>
              <span>Police Station</span>
            </div>
            <div className="legend-item">
              <div className="legend-icon hotel-bg">
                <MapPin size={14} />
              </div>
              <span>Hotel</span>
            </div>
            <div className="legend-item">
              <div className="legend-circle" />
              <span>Your Location</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NearbyHelpScreen;
