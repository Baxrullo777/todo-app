import { useState } from "react";

import plusImage from "../../assets/plus.svg";
import "./input.css";

const Input = ({ addTask }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {

      setInputValue(e.target.value);
    
  };

  const handleAdd = () => {
    if (inputValue.trim()) {
      addTask(inputValue);
      setInputValue("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {  
      handleAdd();  
    }
  };
  return (
    <div className="input-main">
      <input
        type="text"
        className="input"
        placeholder="Add a new task"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
 
      />
      <button className="input-button" onClick={handleAdd}>
        <img src={plusImage} alt="" />
      </button>
    </div>
  );
};

export default Input;
