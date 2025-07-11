'use client';

import React from 'react';
import { Phone } from 'lucide-react';
import './TrustedContact.css';

type Contact = {
  id: number;
  name: string;
  initials: string;
  avatar: string | null;
};

const TrustedContacts: React.FC = () => {
  const contacts: Contact[] = [
    { id: 1, name: 'Mom', initials: 'M', avatar: null },
    { id: 2, name: 'Dad', initials: 'D', avatar: null },
    { id: 3, name: 'Harshi', initials: 'H', avatar: null },
    { id: 4, name: 'Aalya', initials: 'A', avatar: null }
  ];

  const handleCall = (name: string): void => {
    console.log(`Calling ${name}`);
  };

  return (
    <div className="contacts-container">
      <div className="contacts-wrapper">
        <div className="contacts-box">
          <h1 className="contacts-title">My Trusted Contacts</h1>

          <div className="contacts-list">
            {contacts.map((contact) => (
              <div key={contact.id} className="contact-card">
                <div className="contact-info">
                  <div className="contact-avatar">
                    {contact.initials}
                  </div>
                  <span className="contact-name">{contact.name}</span>
                </div>

                <button
                  onClick={() => handleCall(contact.name)}
                  className="call-button"
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
