// SelectDateTime.js

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SelectDateTime = () => {
  const location = useLocation();
  const { patientData, selectedVaccines, pincode } = location.state || {};

  const [selectedDate, setSelectedDate] = useState('');
  const [next15Days, setNext15Days] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  useEffect(() => {
    // Function to get the next 15 days
    const getNext15Days = () => {
      const today = new Date();
      const next15DaysArray = [];

      for (let i = 0; i < 15; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        next15DaysArray.push(date.toISOString().split('T')[0]);
      }

      return next15DaysArray;
    };

    // Set the next 15 days when the component mounts
    setNext15Days(getNext15Days());
  }, []);

  useEffect(() => {
    // Placeholder function to fetch locations based on pincode
    const fetchLocations = async () => {
      // Replace this with actual data fetching logic
      const data = [
        { id: 1, name: 'Location A', address: '123 Main St' },
        { id: 2, name: 'Location B', address: '456 Oak St' },
        // Add more locations as needed
      ];

      setLocations(data);
    };

    // Fetch locations when the component mounts or selected date changes
    if (selectedDate) {
      fetchLocations();
    }
  }, [selectedDate]);

  useEffect(() => {
    // Placeholder function to fetch available time slots based on location
    const fetchTimeSlots = async (locationId) => {
      // Replace this with actual data fetching logic
      const data = [
        { id: 1, time: '10:00 AM' },
        { id: 2, time: '02:00 PM' },
        // Add more time slots as needed
      ];

      setAvailableTimeSlots(data);
    };

    // Fetch available time slots when the location is selected
    if (selectedLocation) {
      fetchTimeSlots(selectedLocation);
    }
  }, [selectedLocation]);

  return (
    <div align='center'>
      <h1>Select dose date for vaccination.</h1>

      <div>
        <label>
          Select Date:
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            <option value="" disabled>Select a date</option>
            {next15Days.map((date) => (
              <option key={date} value={date}>
                {new Date(date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </option>
            ))}
          </select>
        </label>
        <p> Available locations will show once you choose a date. The page will refresh each time you select.</p>
      </div>

      {locations.length > 0 && (
        <div>
          <h3>Available Locations</h3>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="" disabled>Select a location</option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name} - {location.address}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedLocation && (
        <div>
          <h3>Available Time Slots</h3>
          <select
            value={selectedTimeSlot}
            onChange={(e) => setSelectedTimeSlot(e.target.value)}
          >
            <option value="" disabled>Select a time slot</option>
            {availableTimeSlots.map((timeSlot) => (
              <option key={timeSlot.id} value={timeSlot.time}>
                {timeSlot.time}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Continue with other components */}
      <button type="button" onClick={() => console.log('Implement other features')}>
        Continue
      </button>
    </div>
  );
};

export default SelectDateTime;
