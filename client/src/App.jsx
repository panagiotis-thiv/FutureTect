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
import { getHelloMessage } from './services/api';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [step, setStep] = useState(0);
  const [numPeople, setNumPeople] = useState('');
  const [houseSize, setHouseSize] = useState('');
  const [windowRatio, setWindowRatio] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [inputType, setInputType] = useState('text');
  const [inputClassName, setInputClassName] = useState('form-control');
  const [onSubmit, setOnSubmit] = useState(() => {});

  //For python backend
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Call the FastAPI endpoint when the component mounts
    getHelloMessage()
      .then((data) => {
        // Assume your FastAPI endpoint returns an object like { message: "Hello from FastAPI!" }
        setMessage(data.message);
      })
      .catch((error) => console.error('Error fetching message:', error));
  }, []);

  useEffect(() => {
    // Simulate a loading period
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 9800); // Adjust the delay as necessary (3000ms = 3 seconds)

    return () => clearTimeout(timer);
  }, []);

  const handleTextComplete = () => {
   // nothing needed
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

  const handleWindowRatioSubmit = (value) => {
    setWindowRatio(value);
    console.log('Window ratio:', value);
    setStep(step + 1);
  }

  return (
    <div className="App">
      <Navbar message={message}/>
      {isLoading && <Loading />}
      {!isLoading && (
        <div className="content">
          <div className="backend-message">
            <h2>Backend Message:</h2>
            <p>{message ? message : 'No message received yet'}</p>
          </div>
          <div className="upper">
            {step == 0 && <AnimatedText
              text="Welcome to OptiHouse!<br>Let's find the most sustainable way to create your home.<br>First, where would you like it to be located?"
              onComplete={handleTextComplete}
              className="line1"
            />}
            {step == 1 && <AnimatedText
              text="How many people will live in this house?"
              onComplete={handleTextComplete}
              className="line2"
            />}
            {step == 2 && <AnimatedText
              text="What will the total size of the house be in square meters?"
              onComplete={handleTextComplete}
              className="line2"
            />}
            {step == 3 && <AnimatedText
            text="What should be the window-to-wall ratio for your house?<br>The window-to-wall ratio is the percentage of the wall area that is covered by windows.<br>For example, a ratio of 20% means that 20% of the wall area will be windows."
            onComplete={handleTextComplete}
            className="line1"
            />}
          </div>
          <div className="lower">
            {step == 0 && <MapPicker onLocationSelect={handleLocationSelect} className="earth-icon" />}
            {step == 1 && (
              <div className="num-people">
                <img
                  src="ancestors.png"
                  alt="Enter Number of People"
                  onClick={() => handleShowModal('Number of People', 'number', 'form-control', handleNumPeopleSubmit)}
                  className="people-icon.png"
                />
              </div>
            )}
            {step == 2 && (
              <div className="house-size">
                <img
                  src="house_measure.png"
                  alt="Enter House Size"
                  onClick={() => handleShowModal('House Size (sqm)', 'number', 'form-control', handleHouseSizeSubmit)}
                  className="size-icon"
                />
              </div>
            )}
            {step == 3 && (
              <div className="window-ratio">
                <img
                  src="window.png"
                  alt="Enter window to wall ratio"
                  onClick={() => handleShowModal('windows-to-wall ratio (percentage)', 'number', 'form-control', handleWindowRatioSubmit)}
                  className="size-icon"
                />
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