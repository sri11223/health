import React, { useState } from 'react';
import './index.css'; // Import the CSS file for styling

const ChatButton = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  return (
    <div>
      {/* Chat Button */}
      <button className="chat-button" onClick={togglePopup}>
        Chat with Bot
      </button>

      {/* Popup */}
      {isPopupOpen && (
        <div className="chat-popup">
          <iframe
            src="https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2025/01/24/18/20250124181809-78D46SMK.json"
            title="Botpress Chat"
            width="100%"
            height="100%"
            frameBorder="0"
          />
          <button className="close-button" onClick={togglePopup}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatButton;