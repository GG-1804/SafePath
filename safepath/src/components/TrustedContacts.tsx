'use client';


import React from 'react';
import { Phone } from 'lucide-react';

type Contact = {
  id: number;
  name: string;
  initials: string;
  avatar: string | null;
};

const TrustedContacts: React.FC = () => {
  const contacts: Contact[] = [
    {
      id: 1,
      name: 'Anna Bames',
      initials: 'AB',
      avatar: null
    },
    {
      id: 2,
      name: 'Jane Cooper',
      initials: 'JC',
      avatar: null
    },
    {
      id: 3,
      name: 'Michael Chen',
      initials: 'MC',
      avatar: null
    },
    {
      id: 4,
      name: 'Sarah Johnson',
      initials: 'SJ',
      avatar: null
    }
  ];

  const handleCall = (name: string): void => {
    console.log(`Calling ${name}`);
  };

  return (
    <div className="min-h-screen bg-pink-50" style={{ backgroundColor: '#FDEFF3' }}>
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
            My Trusted Contacts
          </h1>

          <div className="space-y-4">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center space-x-3">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
                    {contact.initials}
                  </div>

                  {/* Name */}
                  <span className="text-lg font-medium text-gray-800">
                    {contact.name}
                  </span>
                </div>

                {/* Call Button */}
                <button
                  onClick={() => handleCall(contact.name)}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-300"
                  style={{ backgroundColor: '#F79CA5' }}
                  aria-label={`Call ${contact.name}`}
                >
                  <Phone size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustedContacts;
