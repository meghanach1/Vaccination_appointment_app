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
        console.log('locationsData', locationsData);
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

  useEffect(() => {
    // Function to fetch available time slots based on location
    const fetchTimeSlots = async (locationId) => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/get-time-slots?selectedId=${encodeURIComponent(locationId)}`
        );
        //console.log('locationId :',locationId);
        // Check if the response is successful
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the response JSON
        const timeSlotsData = await response.json();
        console.log('timeSlotsData :',timeSlotsData);
        setAvailableTimeSlots(timeSlotsData.availableTimeSlots);
        console.log('timeSlotsData.availableTimeSlots :',timeSlotsData.availableTimeSlots);
      } catch (error) {
        console.error('Error fetching time slots:', error);
      }
    };

    // Fetch available time slots when the location is selected
    if (selectedLocation) {
      fetchTimeSlots(selectedLocation);
      console.log('selectedLocation :',selectedLocation);
      
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
                key={location._id}
                className={`location-box ${selectedLocation === location.center_name ? 'selected' : ''}`}
                onClick={() => handleLocationClick(location._id)}
              >
                <h4>{location.center_name}</h4>
                <p>{location.location}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    
      {selectedLocation && (
        <div>
          <h3>Available Time Slots</h3>
          <div>
          {availableTimeSlots && availableTimeSlots.map((centerData) => (
    <div key={centerData.centerId}>
        <h3>Available Time Slots for {centerData.centerId}</h3>
        <div>
            {Array.isArray(centerData.timeSlots) && centerData.timeSlots.map((timeSlot) => (
                <button
                    key={timeSlot}
                    className={`time-slot-button ${selectedTimeSlot === timeSlot ? 'selected' : ''}`}
                    onClick={() => setSelectedTimeSlot(timeSlot)}
                >
                    {timeSlot}
                </button>
            ))}
        </div>
    </div>
))}

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
