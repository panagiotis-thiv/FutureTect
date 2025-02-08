import { useState } from 'react';
import './App.css';
import Loading from './Loading';
import Footer from './Footer';
import Navbar from './Navbar';
import AnimatedText from './AnimatedText';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState({});
  const [textComplete, setTextComplete] = useState(false);

  const startLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 10000);
  };

  const handleTextComplete = () => {
    setTextComplete(true);
    setStep(step + 1);
  };

  return (
    <div className="App">
      <Navbar />
      {isLoading && <Loading />}
      {!isLoading && (
        <div className="content">
          <div className="upper">
            <AnimatedText text="Welcome to OptiHouse!" onComplete={handleTextComplete} className="line1" />
            {step >= 1 && <AnimatedText text="Let's find the perfect way to build your home." onComplete={handleTextComplete} className="line2" />}
            {step >= 2 && <AnimatedText text="First, where will your house be built?" onComplete={handleTextComplete} className="line3" />}
          </div>
          <div className="lower">
            {step >= 2 && <button onClick={startLoading}>Start Loading</button>}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;