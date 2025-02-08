import React, { useEffect, useState, useRef } from 'react';
import './AnimatedText.css';

const AnimatedText = ({ text, onComplete, className }) => {
  const [displayedText, setDisplayedText] = useState([]);
  const [index, setIndex] = useState(0);
  const onCompleteCalled = useRef(false); // Track if onComplete has been called

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        const nextChar = text[index];
        if (nextChar === '<' && text.substring(index, index + 4) === '<br>') {
          setDisplayedText([...displayedText, <br key={index} />]);
          setIndex(index + 4);
        } else {
          setDisplayedText([...displayedText, nextChar]);
          setIndex(index + 1);
        }
      }, 25);
      return () => clearTimeout(timeout);
    } else if (index === text.length && !onCompleteCalled.current) {
      if (onComplete) {
        onComplete();
        onCompleteCalled.current = true; // Mark onComplete as called
      }
    }
  }, [index, text, displayedText, onComplete]);

  return <p className={`animated-text ${className}`}>{displayedText}</p>;
};

export default AnimatedText;