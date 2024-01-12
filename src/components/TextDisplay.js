import React, { useEffect, useState } from 'react';
import textFile from '../data/text-data.txt';
import '../styles/TextDisplay.css';

/**
 * 
 * @author Amir
 * 
 */

const TextDisplay = ({ textIndex, onTextHighlight }) => {
  const [germanText, setGermanText] = useState('');
  const [englishText, setEnglishText] = useState('');

  const handleTextSelection = () => {
    const selectedText = window.getSelection().toString();
    if (selectedText) {
      onTextHighlight(selectedText);
    }
  };

  // Fetch German reading texts and their English translations from the input text file
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(textFile);
        const data = await response.text();
        // console.log(data);

        const sections = data.split('----------------');
        
        const germanTexts = sections
          .filter((text) => text.includes('German Text'))
          .map((text) => text.split('+++')[0].trim())
          .map((text) => text.replace('German Text', '').trim());

        const englishTexts = sections
          .filter((text) => text.includes('English Translation'))
          .map((text) => text.split('+++')[1].trim())
          .map((text) => text.replace('English Translation', '').trim());

        setGermanText(germanTexts[textIndex - 1]);
        setEnglishText(englishTexts[textIndex - 1]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [textIndex]);

  return (
    <div onMouseUp={handleTextSelection}>
      <div className="germanTitle">
        <strong>German Text</strong>
      </div>
      <div className="germanSection">{germanText}</div>
      <div className="englishTitle">
        <strong>English Translation</strong>
      </div>
      <div className="englishSection">{englishText}</div>
    </div>
  );
};

export default TextDisplay;
