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
            <AnimatedText
              text="Welcome to OptiHouse!<br>Let's find the perfect way to build your home.<br>First, where will your house be built?"
              onComplete={handleTextComplete}
              className="line1"
            />
          </div>
          <div className="lower">
            {textComplete && <button onClick={startLoading}>Start Loading</button>}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;