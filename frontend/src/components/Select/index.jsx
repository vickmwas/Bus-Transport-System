import React from 'react';
import './Select.css';

const SelectElement = ({ name, value, placeholder, multiple=false,onChange,  options}) => {
  const handleChange = (e) => {
    onChange(e);
  }

  return (

    <select
      multiple={multiple}
      className="SelectElement"
      placeholder={`${placeholder}`}
      onChange={handleChange}
      name={name}
      value={value}
    >
      {
        options.map((option,index) => <option key={index} value={option.value}>{option.value}</option>)
      }
      
    </select>

    
  )
}

export default SelectElement;