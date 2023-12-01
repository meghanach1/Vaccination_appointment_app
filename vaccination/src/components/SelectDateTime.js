import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './css/SelectDateTime.css';

const SelectDateTime = () => {
  const navigate = useNavigate();
  const location = useLocation();
 


  const { patientData, selectedVaccines,totalPrice } = location.state || {};
  const patient_id  = patientData.patient_id;

  const [selectedDate, setSelectedDate] = useState('');
  const [next15Days, setNext15Days] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [isContinueButtonEnabled, setContinueButtonEnabled] = useState(false);
  console.log("selectdatetime totatlaprice",totalPrice)
  console.log("selectdatepatient",patientData.patient_id)
  useEffect(() => {
    // Function to get the next 15 days starting from today
    const getNext15Days = () => {
      const today = new Date();
      today.setDate(today.getDate() + 1);
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

    setNext15Days(getNext15Days());
  }, []);

  useEffect(() => {
    const fetchLocationsData = async () => {
      try {
        const [month, day, year] = selectedDate.split('/');
        const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

        const response = await fetch(
          `http://127.0.0.1:5000/vaccine/api/get-locations?selectedDate=${encodeURIComponent(formattedDate)}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const locationsData = await response.json();
        console.log(locationsData)
        setLocations(locationsData);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    if (selectedDate) {
      fetchLocationsData();
    }
  }, [selectedDate]);

  useEffect(() => {
    const fetchTimeSlots = async (locationId) => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/vaccine/api/get-time-slots?selectedId=${encodeURIComponent(locationId)}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const timeSlotsData = await response.json();
        setAvailableTimeSlots(timeSlotsData.availableTimeSlots);
      } catch (error) {
        console.error('Error fetching time slots:', error);
      }
    };

    if (selectedLocation) {
      fetchTimeSlots(selectedLocation);
    }
  }, [selectedLocation]);

  useEffect(() => {
    if (selectedTimeSlot) {
      setContinueButtonEnabled(true);
    } else {
      setContinueButtonEnabled(false);
    }
  }, [selectedTimeSlot]);

  console.log('selectedDate:', selectedDate);
  console.log('selectedLocation:', setLocations);
  console.log('selectedTimeSlot:', selectedTimeSlot);

  const handleContinue = () => {
    if (isContinueButtonEnabled) {
      // Navigate to SelectDateTime.js with selected vaccines and pin code
      navigate('/medical-history', {
        state: {
          patientData,
          selectedVaccines,
          selectedDate,
          selectedLocation,
          selectedTimeSlot,
          totalPrice,
          patient_id,
          
        },
      });
    }
  };
  const handleBack = () => {
    // Navigate back to the /manage-patient page with patient_id
    navigate('/manage-patient', {
      state: {
        state: {
          patient_id,
          selectedVaccines,
          selectedDate,
          selectedLocation,
          selectedTimeSlot,
          totalPrice,
        },
      },
    });
  };
  const handleLocationClick = (locationId) => {
    setSelectedLocation((prevSelectedLocation) =>
      prevSelectedLocation === locationId ? '' : locationId
    );
  };

  return (
    <div className="select-datetime-container">
      
      <header align='center'>
        <img
          src={require('./images/logo.svg').default}
          alt="Vaccination Logo"
          className="header-logo"
        />
        <h1 align='center'>Select dose date for vaccination</h1>
      </header>
      <div className="date-selection-container">
        <label className="select-date-label">
          Select Date:
          <select
           className="select-date-dropdown"
            value={selectedDate}
            onChange={(e) => {
              const selectedDateValue = e.target.value;
              setSelectedDate(selectedDateValue);
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
        <p className="date-info">
          {' '}
          Available locations will show once you choose a date. The page will refresh each time you select.
        </p>
      </div>

      {locations.length > 0 && (
        <div className="available-locations">
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
        <div className="available-time-slots">
          <h3>Available Time Slots</h3>
          <div>
            {availableTimeSlots && availableTimeSlots.map((centerData) => (
              <div key={centerData.centerId}>
               
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
<button type="button" onClick={handleBack}>
          Back
        </button>
      <button
        type="button"
        onClick={handleContinue}
        disabled={!isContinueButtonEnabled}
      >
        ContinueScheduling
      </button>
    </div>
  );
};

export default SelectDateTime;
