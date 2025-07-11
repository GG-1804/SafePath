'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import './Report.css';

type FormData = {
  incidentType: string;
  description: string;
};

type Errors = {
  incidentType?: string;
  description?: string;
};

export default function ReportPage() {
  const [formData, setFormData] = useState<FormData>({
    incidentType: '',
    description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const [errors, setErrors] = useState<Errors>({});

  const incidentTypes = [
    { value: '', label: 'Select an incident type' },
    { value: 'Harassment', label: 'Harassment' },
    { value: 'Theft', label: 'Theft' },
    { value: 'Accident', label: 'Accident' },
    { value: 'Other', label: 'Other' }
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Errors = {};
    if (!formData.incidentType) {
      newErrors.incidentType = 'Please select an incident type';
    }
    if (!formData.description) {
      newErrors.description = 'Please enter a description';
    } else if (formData.description.length < 30) {
      newErrors.description = 'Please enter a detailed description (at least 30 characters)';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setMessage('');

    try {
      await sendEmailWithEmailJS();
      setMessage('Report submitted successfully!');
      setMessageType('success');
      setFormData({ incidentType: '', description: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      setMessage('Something went wrong. Please try again.');
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

 const sendEmailWithEmailJS = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.2) {
        resolve('Email sent successfully');
      } else {
        reject(new Error('Email failed'));
      }
    }, 2000);
  });
};


  return (
    <div className="report-container">
      <div className="report-wrapper">
        <div className="report-header">
          <h1>Submit a Report</h1>
          <p>Help us keep our community safe by reporting incidents</p>
        </div>

        <div className="report-form">
          <div className="form-box">
            {message && (
              <div className={`message ${messageType}`}>
                {message}
              </div>
            )}

            <div className="form-section">
              <div>
                <label>Incident Type *</label>
                <select
                  value={formData.incidentType}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    handleInputChange('incidentType', e.target.value)
                  }
                  className={errors.incidentType ? 'error-border' : ''}
                >
                  {incidentTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                {errors.incidentType && (
                  <p className="error-text">{errors.incidentType}</p>
                )}
              </div>

              <div>
                <label>Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    handleInputChange('description', e.target.value)
                  }
                  placeholder="Describe the incident, clearly mentioning the location and what happened..."
                  rows={6}
                  className={errors.description ? 'error-border' : ''}
                />
                <div className="char-counter">
                  {errors.description && (
                    <p className="error-text">{errors.description}</p>
                  )}
                  <p className="char-count">
                    {formData.description.length}/30 characters minimum
                  </p>
                </div>
              </div>

              <div className="submit-section">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={isSubmitting ? 'btn-disabled' : 'btn-submit'}
                >
                  {isSubmitting ? (
                    <span className="loading">
                      <svg className="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    'Submit'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
