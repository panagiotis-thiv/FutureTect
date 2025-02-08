import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Loading from './Loading';
import AnimatedText from './AnimatedText';
import MapPicker from './MapPicker';
import CustomModalForm from './CustomModalForm';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ChatBot from './ChatBot';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [step, setStep] = useState(0);
  const [numPeople, setNumPeople] = useState('');
  const [houseSize, setHouseSize] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [inputType, setInputType] = useState('text');
  const [inputClassName, setInputClassName] = useState('form-control');
  const [onSubmit, setOnSubmit] = useState(() => {});

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

  return (
    <div className="App">
      <Navbar />
      {isLoading && <Loading />}
      {!isLoading && (
        <div className="content">
          <div className="upper">
            {step == 0 && <AnimatedText
              text="Welcome to OptiHouse!<br>Let's find the perfect way to create your home.<br>First, where would you like it to be located?"
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