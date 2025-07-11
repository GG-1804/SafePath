'use client';

import React, { useState, useEffect, useRef } from 'react';
import './EmergencyHelpline.css';

const EmergencyHelplineScreen: React.FC = () => {
  const [showFakeCall, setShowFakeCall] = useState(false);
  const [inCall, setInCall] = useState(false);
  const [callTimer, setCallTimer] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (inCall) {
      interval = setInterval(() => setCallTimer(prev => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [inCall]);

  useEffect(() => {
    if (showFakeCall) {
      audioRef.current?.play().catch(err => console.warn('Autoplay blocked:', err));
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [showFakeCall]);

  const handleSOS = () => alert('SOS sent to all Trusted Contacts.');
  const handleFakeCall = () => setShowFakeCall(true);
  const handleAcceptCall = () => {
    setInCall(true);
    setShowFakeCall(false);
    setCallTimer(0);
  };
  const handleDeclineCall = () => setShowFakeCall(false);
  const handleEndCall = () => {
    setInCall(false);
    setCallTimer(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="helpline-container">
      <h1 className="helpline-title">Emergency Actions</h1>

      <div className="helpline-buttons">
        <button className="btn-sos" onClick={handleSOS}>SOS</button>
        <button className="btn-fake-call" onClick={handleFakeCall}>Fake Call</button>
      </div>

      <audio ref={audioRef} src="/squid_game.mp3" preload="auto" />

      {showFakeCall && (
        <div className="fake-call-modal">
          <div className="caller-info">
            <div className="avatar">👤</div>
            <h2>Mom</h2>
            <p>Calling...</p>
            <div className="call-actions">
              <button className="btn-decline" onClick={handleDeclineCall}>📞</button>
              <button className="btn-accept" onClick={handleAcceptCall}>📞</button>
            </div>
          </div>
        </div>
      )}

      {inCall && (
        <div className="in-call-screen">
          <div className="caller-info">
            <div className="avatar small">👤</div>
            <h2>Mom</h2>
            <p className="call-timer">{formatTime(callTimer)}</p>
          </div>

          <div className="call-grid">
            <div className="call-option"><div>➕</div><span>Add Call</span></div>
            <div className="call-option"><div>🎥</div><span>Video</span></div>
            <div className="call-option"><div>🔊</div><span>Bluetooth</span></div>
            <div className="call-option"><div>🔈</div><span>Speaker</span></div>
            <div className="call-option"><div>🔇</div><span>Mute</span></div>
            <div className="call-option"><div>🔢</div><span>Keypad</span></div>
          </div>

          <div className="end-call">
            <button className="btn-end-call" onClick={handleEndCall}>📞</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyHelplineScreen;
