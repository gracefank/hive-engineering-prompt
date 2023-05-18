import React, { useState, useEffect, useRef } from "react";
import "./MultiSelectDropdown.css";

const MultiSelectDropdown = ({
  options,
  onChange,
  multiSelect,
  label,
  placeholder = "Select option(s)",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const dropdownRef = useRef(null);

  const handleOptionToggle = (event) => {
    const { value } = event.target;

    if (multiSelect) {
      const isChecked = selectedOptions.includes(value);
      let updatedOptions = [];

      if (isChecked) {
        updatedOptions = selectedOptions.filter((option) => option !== value);
      } else {
        updatedOptions = [...selectedOptions, value];
      }

      setSelectedOptions(updatedOptions);
      onChange(updatedOptions);
    } else {
      setSelectedOptions([value]);
      setIsOpen(false);
      onChange(value);
    }
  };

  const handleDropdownToggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  // handle unfocus dropdown
  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // toggles select/deselect all button
  const handleToggleAll = () => {
    if (selectedOptions.length === options.length) {
      setSelectedOptions([]);
      onChange([]);
    } else {
      setSelectedOptions(options);
      onChange(options);
    }
  };

  return (
    <div
      className={`multiselect-dropdown ${isOpen ? "active" : ""}`}
      ref={dropdownRef}
    >
      <label className="dropdown-label">{label || "Options"}</label>
      <button
        className={`dropdown-header ${isOpen ? "active" : ""}`}
        onClick={handleDropdownToggle}
        ref={dropdownRef}
      >
        {multiSelect && selectedOptions.length > 0 ? (
          <span className="selected-options" title={selectedOptions.join(", ")}>
            {selectedOptions.join(", ")}
          </span>
        ) : (
          <span className={`placeholder ${multiSelect ? "" : "italic"}`}>
            {selectedOptions[0] || placeholder}
          </span>
        )}
        <div className={`dropdown-arrow${isOpen ? " rotate" : ""}`}></div>
      </button>

      {/* dropdown component */}
      {isOpen && (
        <div className="dropdown-menu">
          {multiSelect && (
            <div className="dropdown-buttons">
              <button onClick={handleToggleAll}>
                {selectedOptions.length === options.length
                  ? "Deselect All"
                  : "Select All"}
              </button>
            </div>
          )}
          <div className="dropdown-options">
            {options.map((option) => (
              <div key={option} className="option">
                {multiSelect ? (
                  <>
                    <input
                      type="checkbox"
                      id={option}
                      value={option}
                      checked={selectedOptions.includes(option)}
                      onChange={handleOptionToggle}
                    />
                    <label htmlFor={option}>{option}</label>
                  </>
                ) : (
                  <label htmlFor={option}>
                    <input
                      type="radio"
                      id={option}
                      value={option}
                      checked={selectedOptions.includes(option)}
                      onChange={handleOptionToggle}
                    />
                    {option}
                  </label>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
