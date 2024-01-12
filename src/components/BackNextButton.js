import React from 'react';
import '../styles/BackNextButton.css';

/**
 * 
 * @author Amir
 * 
 */

const BackNextButton = ({ onBack, onNext }) => {
  return (
    <div className="btnBackNext">
      <button onClick={onBack}>Back</button>
      <button onClick={onNext}>Next</button>
    </div>
  );
};

export default BackNextButton;
