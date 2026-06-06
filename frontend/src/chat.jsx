
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://crud-backend-lpf5.onrender.com/api/chat/';

function Chat() {
  const [chatHistory, setChatHistory] = useState([]);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // 1. Fetch history when the Chat page loads
  useEffect(() => {
    fetchChatHistory();
  }, []);

  const fetchChatHistory = async () => {
    try {
      const response = await axios.get(CHAT_API_URL);
      setChatHistory(response.data);
    } catch (error) {
      console.error("Error fetching chat history", error);
    }
  };

  // 2. Handle sending a new message
  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!currentPrompt.trim()) return;

    setIsTyping(true); // Show a loading indicator
    
    try {
      const response = await axios.post(CHAT_API_URL, { prompt: currentPrompt });
      // Add the new response to the bottom of the list
      setChatHistory(prevHistory => [...prevHistory, response.data]);
      setCurrentPrompt(''); // Clear the input box
    } catch (error) {
      console.error("Error talking to AI", error);
      alert("Failed to get a response from the AI.");
    } finally {
      setIsTyping(false); // Hide the loading indicator
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>✨ AI Assistant</h2>
      
      {/* Chat History Window */}
      <div style={{ height: '400px', overflowY: 'auto', border: '1px solid #ccc', padding: '15px', borderRadius: '8px', backgroundColor: '#f9f9f9', marginBottom: '15px' }}>
        {chatHistory.length === 0 && <p style={{ color: 'gray', textAlign: 'center' }}>No messages yet. Start a conversation!</p>}
        
        {chatHistory.map((chat, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <div style={{ fontWeight: 'bold', color: '#0056b3' }}>You:</div>
            <div style={{ marginBottom: '8px', paddingLeft: '10px' }}>{chat.user_prompt}</div>
            
            <div style={{ fontWeight: 'bold', color: '#28a745' }}>AI:</div>
            <div style={{ paddingLeft: '10px', whiteSpace: 'pre-wrap' }}>{chat.ai_response}</div>
          </div>
        ))}
        {isTyping && <div style={{ fontStyle: 'italic', color: 'gray', marginTop: '10px' }}>AI is thinking...</div>}
      </div>

      {/* Message Input Form */}
      <form onSubmit={handleChatSubmit} style={{ display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          value={currentPrompt} 
          onChange={(e) => setCurrentPrompt(e.target.value)} 
          placeholder="Ask me anything..." 
          style={{ flexGrow: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          disabled={isTyping}
        />
        <button 
          type="submit" 
          disabled={isTyping} 
          style={{ padding: '10px 20px', cursor: isTyping ? 'not-allowed' : 'pointer', backgroundColor: '#0056b3', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;