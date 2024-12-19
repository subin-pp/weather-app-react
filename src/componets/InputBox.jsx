import React, { useState } from 'react';
import '../InputBox.css';  

const InputBox = () => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className="input-container">
      <input
        type="text"  // Input type should be text
        placeholder="Enter text"
        className={`input-box ${isFocused ? 'focused' : ''}`}  // Dynamically add 'focused' class
        value={inputValue}  // Bind input value to state
        onChange={e => setInputValue(e.target.value)}  // Directly update the input value
        onFocus={() => setIsFocused(true)}  // When input is focused
        onBlur={() => setIsFocused(false)}  // When input loses focus
      />
    </div>
  );
};

export default InputBox;
