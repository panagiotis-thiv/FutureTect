import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Loading from './utils/Loading';
import AnimatedText from './utils/AnimatedText';
import MapPicker from './components/dialogs/MapPicker';
import CustomModalForm from './components/dialogs/CustomModalForm';
import Footer from './components/layout/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ChatBot from './utils/ChatBot';
import { getEstimate } from './services/api'; // Ensure this import is correct

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [step, setStep] = useState(0);
  const [numPeople, setNumPeople] = useState('');
  const [houseSize, setHouseSize] = useState('');
  const [windowRatio, setWindowRatio] = useState('');
  const [insulation, setInsulation] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [inputType, setInputType] = useState('text');
  const [inputClassName, setInputClassName] = useState('form-control');
  const [onSubmit, setOnSubmit] = useState(() => {});
  const [message, setMessage] = useState('');
  const [results, setResults] = useState(null); // State to store API results
  const [apiError, setApiError] = useState(null); // State to handle API errors

  // Simulate a loading period
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 9800); // Adjust the delay as necessary

    return () => clearTimeout(timer);
  }, []);

  const handleTextComplete = () => {
    // Nothing needed
  };

  const handleLocationSelect = (location) => {
    setLocation(location);
    console.log('Selected location:', location);
    setStep(step + 1);
  };

  const handleNumPeopleSubmit = (value) => {
    setNumPeople(value);
    console.log('Number of people:', value);
    setStep(step + 1);
  };

  const handleHouseSizeSubmit = (value) => {
    setHouseSize(value);
    console.log('House size:', value);
    setStep(step + 1);
  };

  const handleWindowRatioSubmit = (value) => {
    setWindowRatio(value);
    console.log('Window ratio:', value);
    setStep(step + 1);
  };

  const handleInsulationSubmit = (value) => {
    setInsulation(value);
    console.log('Insulation percentage:', value);
    setStep(step + 1);
  };

  const handleShowModal = (title, type, className, onSubmitHandler) => {
    setModalTitle(title);
    setInputType(type);
    setInputClassName(className);
    setOnSubmit(() => onSubmitHandler);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  let result_string = '';

  // Call the API to get the estimate
  useEffect(() => {
    if (step === 5) {
      const fetchEstimate = async () => {
        try {
          const lat = location.latitude;
          const lng = location.longitude;       
          const data = await getEstimate(houseSize, windowRatio, insulation, lat, lng);
          let results_string = `Results:<br>Energy Saving Potential (%): ${data.energy_savings_potential}<br>Zonal Heating/Cooling Data (kWh): ${data.zonal_heating_cooling_data}<br>Carbon Emission Rate (g CO2/kWh): ${data.carbon_emission_rate}<br>Water Usage (liters): ${data.water_usage}<br>Lighting Consumption (kWh): ${data.lighting_consumption}`;
          setResults(results_string); // Store the results in state
          setApiError(null); // Clear any previous errors
          setStep(step + 1);
        } catch (error) {
          console.error('Error fetching estimate:', error);
          setApiError('Failed to fetch estimate. Please try again.'); // Set error message
        }
      };
      fetchEstimate();
    }
  }, [step, location, houseSize, windowRatio, insulation]);

  return (
    <div className="App">
      <Navbar message={message} />
      {isLoading && <Loading />}
      {!isLoading && (
        <div className="content">
          <div className="backend-message">
            <h2>Backend Message:</h2>
            <p>{message ? message : 'No message received yet'}</p>
          </div>
          <div className="upper">
            {step === 0 && (
              <AnimatedText
                text="Welcome to FutureTect!<br>Let's find the most sustainable way to create your home.<br>First, where would you like it to be located?"
                onComplete={handleTextComplete}
                className="line1"
              />
            )}
            {step === 1 && (
              <AnimatedText
                text="How many people will live in this house?"
                onComplete={handleTextComplete}
                className="line2"
              />
            )}
            {step === 2 && (
              <AnimatedText
                text="What will the total size of the house be in square meters?"
                onComplete={handleTextComplete}
                className="line2"
              />
            )}
            {step === 3 && (
              <AnimatedText
                text="What should be the window-to-wall ratio for your house?<br>The window-to-wall ratio is the percentage of the wall area that is covered by windows.<br>For example, a ratio of 20% means that 20% of the wall area will be windows."
                onComplete={handleTextComplete}
                className="line1"
              />
            )}
            {step === 4 && (
              <AnimatedText
                text="What percentage of insulation would you like for your house?<br>Insulation helps keep your home energy-efficient and comfortable."
                onComplete={handleTextComplete}
                className="line1"
              />
            )}
          </div>
          <div className="lower">
            {step === 0 && <MapPicker onLocationSelect={handleLocationSelect} className="earth-icon" />}
            {step === 1 && (
              <div className="num-people">
                <img
                  src="ancestors.png"
                  alt="Enter Number of People"
                  onClick={() => handleShowModal('Number of People', 'number', 'form-control', handleNumPeopleSubmit)}
                  className="icon"
                />
              </div>
            )}
            {step === 2 && (
              <div className="house-size">
                <img
                  src="house_measure.png"
                  alt="Enter House Size"
                  onClick={() => handleShowModal('House Size (sqm)', 'number', 'form-control', handleHouseSizeSubmit)}
                  className="icon"
                />
              </div>
            )}
            {step === 3 && (
              <div className="window-ratio">
                <img
                  src="window.png"
                  alt="Enter window to wall ratio"
                  onClick={() => handleShowModal('windows-to-wall ratio (percentage)', 'number', 'form-control', handleWindowRatioSubmit)}
                  className="icon"
                />
              </div>
            )}
            {step === 4 && (
              <div className="window-ratio">
                <img
                  src="insulation.png"
                  alt="Enter insulation percentage"
                  onClick={() => handleShowModal('insulation percentage', 'number', 'form-control', handleInsulationSubmit)}
                  className="icon"
                />
              </div>
            )}
            {step === 6 && (
              <div className="results">
                {apiError && <p style={{ color: 'red' }}>{apiError}</p>}
                {results && (
                    <AnimatedText
                    text={results}
                    onComplete={handleTextComplete}
                    className="line1 results"
                    />           
                )}
              </div>
            )}
            <CustomModalForm
              show={showModal}
              onHide={handleCloseModal}
              title={modalTitle}
              inputType={inputType}
              inputClassName={inputClassName}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      )}
      <Footer />
      <ChatBot />
    </div>
  );
}

export default App;