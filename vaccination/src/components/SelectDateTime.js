import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './css/SelectDateTime.css';

const SelectDateTime = () => {
  const location = useLocation();
  const { patientData, selectedVaccines } = location.state || {};

  const [selectedDate, setSelectedDate] = useState('');
  const [next15Days, setNext15Days] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [centerInfo, setCenterInfo] = useState(null);

  useEffect(() => {
    // Function to get the next 15 days starting from today
    const getNext15Days = () => {
      const today = new Date(); // Use the current date
      today.setDate(today.getDate() + 1);
      // Initialize an empty array to store the next 15 days
      const next15DaysArray = [];

      for (let i = 0; i < 15; i++) {
        const date = new Date(today);
        date.setUTCDate(today.getUTCDate() + i);
        const formattedDate = new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }).format(date);

        next15DaysArray.push(formattedDate);
      }

      return next15DaysArray;
    };

    // Set the next 15 days when the component mounts
    setNext15Days(getNext15Days());
  }, []);

  useEffect(() => {
    // Function to fetch locations based on the selected date
    const fetchLocationsData = async () => {
      try {
        const [month, day, year] = selectedDate.split('/');
        const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

        console.log('Formatted Date:', formattedDate);

        const response = await fetch(
          `http://127.0.0.1:5000/api/get-locations?selectedDate=${encodeURIComponent(
            formattedDate
          )}`
        );

        // Check if the response is successful
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the response JSON
        const locationsData = await response.json();

        console.log('Locations data:', locationsData);
        setLocations(locationsData); // Set locations in state
        setCenterInfo(null); // Reset center info when date changes
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    // Fetch locations when the selected date changes
    if (selectedDate) {
      fetchLocationsData();
    }
  }, [selectedDate]);
  console.log('Selected date:', selectedDate);

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
    console.log('selectedLocation :', selectedLocation);
    // Fetch available time slots when the location is selected
    if (selectedLocation) {
      fetchTimeSlots(selectedLocation);
    }
  }, [selectedLocation]);

  const handleContinue = () => {
    // Add logic here to handle the continue button click,
    // for example, navigate to the next step or perform additional actions
    console.log('Implement other features');
  };

  const handleLocationClick = (locationId) => {
    setSelectedLocation((prevSelectedLocation) =>
      prevSelectedLocation === locationId ? '' : locationId
    );
  };

  return (
    <div align="center">
      <h1>Select dose date for vaccination.</h1>

      <div>
        <label>
          Select Date:
          <select
            value={selectedDate}
            onChange={(e) => {
              const selectedDateValue = e.target.value;
              setSelectedDate(selectedDateValue);

              // Convert the selected date to UTC format
              const utcDate = new Date(selectedDateValue);
              utcDate.setMinutes(utcDate.getMinutes() - utcDate.getTimezoneOffset());
              console.log('Selected Date:', utcDate.toISOString().split('T')[0]);
            }}
          >
            <option value="" disabled>
              Select a date
            </option>
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
        <p>
          {' '}
          Available locations will show once you choose a date. The page will refresh each time
          you select.
        </p>
      </div>

      {locations.length > 0 && (
        <div>
          <h3>Available Locations</h3>
          <div className="location-container">
            {locations.map((location) => (
              <div
                key={location.id}
                className={`location-box ${selectedLocation === location.id ? 'selected' : ''}`}
                onClick={() => handleLocationClick(location.id)}
              >
                <h5>{location.center_name}</h5>
                <p>{location.location}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedLocation && (
        <div>
          <h3>Available Time Slots</h3>
          <select
            value={selectedTimeSlot}
            onChange={(e) => setSelectedTimeSlot(e.target.value)}
          >
            <option value="" disabled>
              Select a time slot
            </option>
            {availableTimeSlots.map((timeSlot) => (
              <option key={timeSlot.id} value={timeSlot.time}>
                {timeSlot.time}
              </option>
            ))}
          </select>
        </div>
      )}

      {locations.length > 0 && selectedLocation && (
        <div>
          <h3>Selected Center Information</h3>
          <div className="selected-location">
            <p>
              Center Name:{' '}
              <span className="selected-value">
                {locations.find((location) => location.id === selectedLocation)?.center_name}
              </span>
            </p>
            <p>
              Location:{' '}
              <span className="selected-value">
                {locations.find((location) => location.id === selectedLocation)?.location}
              </span>
            </p>
          </div>
        </div>
      )}

      {/* Continue with other components */}
      <button type="button" onClick={handleContinue}>
        Continue Scheduling
      </button>
    </div>
  );
};

export default SelectDateTime;
