import { useState } from 'react';
import './App.css';
import Loading from './Loading';
import Footer from './Footer';
import Navbar from './Navbar'; // Import the Navbar component

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => {
    setIsLoading(true);
    // Simulate a process
    setTimeout(() => {
      setIsLoading(false);
    }, 10000);
  };

  return (
    <div className="App">
      <Navbar /> {/* Include the Navbar component */}
      {isLoading && <Loading />}
      <button onClick={startLoading}>Start Loading</button>
      <Footer />
    </div>
  );
}

export default App;