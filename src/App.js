import React, { useState, useEffect } from 'react';
import TextDisplay from './components/TextDisplay';
import BackNextButton from './components/BackNextButton';
import Popup from './components/Popup';
import textFile from './data/text-data.txt';
import './styles/App.css';

/**
 * German Reading Practice App
 * 
 * @author Amir
 * 
 */

function App() {
  const [textIndex, setTextIndex] = useState(1);
  const [totalTexts, setTotalTexts] = useState(0);
  const [highlightedText, setHighlightedText] = useState('');
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [translatedText, setTranslatedText] = useState('');

  // Find the total number of reading texts from the input text file
  useEffect(() => {
    const fetchTotalTexts = async () => {
      try {
        const response = await fetch(textFile);
        const data = await response.text();
        const sections = data.split('----------------');
        const totalTextsCount = sections.filter(
          (text) => text.includes('German Text')
        ).length;
        setTotalTexts(totalTextsCount);
      } catch (error) {
        console.error('Error fetching total texts:', error);
      }
    };

    fetchTotalTexts();
  }, []);

  const handleNextClick = () => {
    setTextIndex((prevIndex) => Math.min(prevIndex + 1, totalTexts));
    setHighlightedText('');
    setTranslatedText('');
    setPopupVisible(false);
  };

  const handleBackClick = () => {
    setTextIndex((prevIndex) => Math.max(prevIndex - 1, 1));
    setHighlightedText('');
    setTranslatedText('');
    setPopupVisible(false);
  };

  const handleTextHighlight = (text) => {
    if (text) {
      setHighlightedText(text);
      translateText(text);
      setPopupVisible(true);
    }
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  /* Translate the highlighted text via LibreTranslate API on localhost. Any other
  translation services (Google Translate, DeepL, etc.) can also be used. Just make sure
  to update the following accordingly. */
  const translateText = async (text) => {
    try {
      setTranslatedText('');
      const response = await fetch('http://localhost:5000/translate', {
        method: 'POST',
        body: JSON.stringify({
          q: text,
          source: 'de', // auto
          target: 'en',
          format: 'text'
        }),
        headers: {'Content-Type' : 'application/json'}
      });

      const result = await response.json();
      setTranslatedText(result.translatedText);
    } catch (error) {
      console.error('Error translating text:', error);
      setTranslatedText('Translation Error');
    }
  };

  return (
    <div className="App">
      <TextDisplay
        textIndex={textIndex}
        onTextHighlight={handleTextHighlight}
      />
      <BackNextButton onBack={handleBackClick} onNext={handleNextClick} />
      {isPopupVisible && (
        <Popup
          highlightedText={highlightedText}
          translatedText={translatedText}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
}

export default App;
