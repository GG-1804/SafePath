'use client';

import React, { useState, useEffect, useRef } from 'react';

const EmergencyHelplineScreen: React.FC = () => {
  const [showFakeCall, setShowFakeCall] = useState<boolean>(false);
  const [inCall, setInCall] = useState<boolean>(false);
  const [callTimer, setCallTimer] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Timer effect for the in-call screen
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (inCall) {
      interval = setInterval(() => {
        setCallTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [inCall]);

  useEffect(() => {
    if (showFakeCall) {
      audioRef.current?.play().catch((err) => {
        console.warn('Autoplay blocked:', err);
      });
    } else {
      audioRef.current?.pause();
      audioRef.current!.currentTime = 0;
    }
  }, [showFakeCall]);

  const handleSOS = (): void => {
    console.log('SOS Alert Triggered');
  };

  const handleFakeCall = (): void => {
    console.log('Fake Call Initiated');
    setShowFakeCall(true);
  };

  const handleAcceptCall = (): void => {
    setInCall(true);
    setShowFakeCall(false);
    setCallTimer(0);
  };

  const handleDeclineCall = (): void => {
    setShowFakeCall(false);
  };

  const handleEndCall = (): void => {
    setInCall(false);
    setCallTimer(0);
  };


  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4" style={{ backgroundColor: '#FDEFF3' }}>
      {/* Page Heading */}
      <h1 className="text-3xl font-bold text-gray-800 mb-16 text-center">
        Emergency Actions
      </h1>

      {/* Main UI Container */}
      <div className="flex flex-col items-center space-y-12">
        {/* SOS Button */}
        <button
          onClick={handleSOS}
          className="w-48 h-48 rounded-full text-white text-2xl font-bold shadow-lg transition-all duration-300 hover:scale-105 hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-pink-300 active:scale-95"
          style={{ backgroundColor: '#F7AEB5' }}
          aria-label="Trigger SOS alert for emergency assistance"
        >
          SOS
        </button>

        {/* Fake Call Button */}
        <button
          onClick={handleFakeCall}
          className="w-48 h-48 rounded-full text-white text-2xl font-bold shadow-lg transition-all duration-300 hover:scale-105 hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-purple-300 active:scale-95"
          style={{ backgroundColor: '#A194E2' }}
          aria-label="Initiate fake call to simulate incoming call"
        >
          Fake Call
        </button>
      </div>

      {/* Ringtone Audio */}
      <audio ref={audioRef} src="/squid_game.mp3" preload="auto" />

      {/* Fake Call Modal */}
      {showFakeCall && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col justify-center items-center z-50">
          <div className="text-center text-white">
            {/* Caller Avatar */}
            <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-4xl text-gray-600">👤</span>
            </div>

            {/* Caller Info */}
            <h2 className="text-4xl font-bold mb-2">Mom</h2>
            <p className="text-xl text-gray-300 mb-12">Calling...</p>

            {/* Call Action Buttons */}
            <div className="flex justify-center space-x-16">
              {/* Decline Button */}
              <button
                onClick={handleDeclineCall}
                className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center text-white text-2xl hover:bg-red-600 transition-colors duration-200 shadow-lg"
                aria-label="Decline call"
              >
                📞
              </button>

              {/* Accept Button */}
              <button
                onClick={handleAcceptCall}
                className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl hover:bg-green-600 transition-colors duration-200 shadow-lg"
                aria-label="Accept call"
              >
                📞
              </button>
            </div>
          </div>
        </div>
      )}

      
      {/* In-Call Screen */}
{inCall && (
  <div className="fixed inset-0 bg-black bg-opacity-95 flex flex-col justify-between items-center z-50 py-12">
    {/* Call Info */}
    <div className="text-center text-white">
      <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
        <span className="text-2xl text-gray-600">👤</span>
      </div>
      <h2 className="text-2xl font-bold mb-2">Mom</h2>
      {/* <p className="text-lg text-gray-300 mb-4">Call in progress with Mom</p> */}
      <p className="text-3xl font-mono text-white mb-6">{formatTime(callTimer)}</p>
    </div>

      {/* Call Control Grid */}
      <div className="grid grid-cols-3 gap-8 mb-10 text-white">
        {/* Add Call */}
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 bg-gray-700 rounded-full flex items-center justify-center text-2xl hover:bg-gray-600 transition">
            ➕
          </div>
          <span className="text-sm mt-2">Add Call</span>
        </div>

        {/* Video Call */}
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 bg-gray-700 rounded-full flex items-center justify-center text-2xl hover:bg-gray-600 transition">
            🎥
          </div>
          <span className="text-sm mt-2">Video</span>
        </div>

        {/* Bluetooth */}
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 bg-gray-700 rounded-full flex items-center justify-center text-2xl hover:bg-gray-600 transition">
            🔊
          </div>
          <span className="text-sm mt-2">Bluetooth</span>
        </div>

        {/* Speaker */}
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 bg-gray-700 rounded-full flex items-center justify-center text-2xl hover:bg-gray-600 transition">
            🔈
          </div>
          <span className="text-sm mt-2">Speaker</span>
        </div>

        {/* Mute */}
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 bg-gray-700 rounded-full flex items-center justify-center text-2xl hover:bg-gray-600 transition">
            🔇
          </div>
          <span className="text-sm mt-2">Mute</span>
        </div>

        {/* Keypad */}
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 bg-gray-700 rounded-full flex items-center justify-center text-2xl hover:bg-gray-600 transition">
            🔢
          </div>
          <span className="text-sm mt-2">Keypad</span>
        </div>
      </div>
    

    {/* End Call Button */}
    <div className="flex justify-center">
      <button
        onClick={handleEndCall}
        className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center text-white text-2xl hover:bg-red-600 transition-colors duration-200 shadow-lg"
        aria-label="End call"
      >
        📞
      </button>
    </div>
  </div>
)}


          {/* Call Controls
          <div className="flex justify-center">
            <button
              onClick={handleEndCall}
              className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center text-white text-2xl hover:bg-red-600 transition-colors duration-200 shadow-lg"
              aria-label="End call"
            >
              📞
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default EmergencyHelplineScreen;
