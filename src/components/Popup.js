import React, { useRef, useEffect } from 'react';
import '../styles/Popup.css';

/**
 * 
 * @author Amir
 * 
 */

const Popup = ({ highlightedText, translatedText, onClose }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    // Get the bounding box of the highlighted text
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    // Set the position of the popup
    const popup = popupRef.current;
    popup.style.top = `${rect.top + window.scrollY}px`;
    popup.style.left = `${rect.left + window.scrollX}px`;
  }, [highlightedText]);

  return (
    <div className="popup" ref={popupRef}>
      <div className="popup-content">
        <span className="popup-title">LibreTranslate</span>
        <div className="close" onClick={onClose}>
          &times;
        </div>
        <p>
        Translation of{' '}
          <span style={{ color: 'blue' }}>{highlightedText}</span> is{' '}
          <span style={{ color: 'green' }}>{translatedText}</span>.
        </p>
      </div>
    </div>
  );
};

export default Popup;
