import React, { useState } from 'react';
import '../assets/styles/ChatBot.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello, I'm here to help you with sustainable housing solutions." },
  ]);
  const [input, setInput] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = async () => {
    if (input.trim() === '') return;

    const newMessage = { role: 'user', content: input };
    setMessages([...messages, newMessage]);
    setInput('');

    // Call OpenAI API
    const botResponse = await getBotResponse(input);
    setMessages((prevMessages) => [...prevMessages, botResponse]);
  };

  const getBotResponse = async (userInput) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            { role: 'system', content: 'You are an assistant whose job is to help advise on sustainable housing solutions. Keep your replies quick and small whenever possible.' },
            { role: 'user', content: userInput },
          ],
          max_tokens: 50,
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      console.log(data); // Log the response to see what is being returned
      if (data.choices && data.choices.length > 0) {
        return { role: 'assistant', content: data.choices[0].message.content.trim() };
      } else {
        return { role: 'assistant', content: 'Sorry, I could not generate a response.' };
      }
    } catch (error) {
      console.error('Error fetching bot response:', error);
      return { role: 'assistant', content: 'Sorry, there was an error generating a response.' };
    }
  };

  return (
    <div>
      <button className="chatbot-toggle" onClick={toggleChat}>
        {isOpen ? 'Close' : 'Chat'}
      </button>
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chatbot-message ${msg.role}`}>
                {msg.content}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;