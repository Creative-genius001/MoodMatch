import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';


const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
];

export default function Dropdown() {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  // Handler for when an option is selected
  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* The visible select button (the "trigger") */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        // The key styling here is removing borders, outlines, and backgrounds
        className="inline-flex justify-center items-center gap-2 p-2 text-sm font-medium text-gray-700 bg-transparent
                   focus:outline-none focus:ring-1 focus:ring-indigo-500"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {selectedOption.label}
        {/* The icon to indicate it's a dropdown. It rotates based on the `isOpen` state. */}
        <ChevronDown
          className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          aria-hidden="true"
        />
      </button>

      {/* The dropdown menu itself */}
      {isOpen && (
        <div
          className="absolute left-0 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5
                     focus:outline-none"
        >
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelectOption(option)}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
