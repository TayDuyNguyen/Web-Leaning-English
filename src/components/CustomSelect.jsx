import { useEffect, useId, useRef, useState } from 'react';

export default function CustomSelect({
  options = [],
  value,
  onChange,
  disabled = false,
  style = {}
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const dropdownId = useId();

  const selectedOption = options.find(opt => opt.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (val, optDisabled) => {
    if (optDisabled) return;
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div 
      className={`custom-select-container ${isOpen ? 'is-open' : ''}`} 
      ref={containerRef}
      style={style}
    >
      <button
        type="button"
        onClick={handleToggle}
        className={`custom-select-trigger ${isOpen ? 'is-open' : ''} ${disabled ? 'is-disabled' : ''}`}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={dropdownId}
      >
        <span className="custom-select-value">
          {selectedOption ? selectedOption.label : 'Chọn tùy chọn...'}
        </span>
        <span className="custom-select-chevron" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
            <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className="custom-select-dropdown" id={dropdownId} role="listbox">
          {options.map((opt) => (
            <button
              type="button"
              key={opt.value}
              onClick={() => handleSelect(opt.value, opt.disabled)}
              className={`custom-select-option ${opt.value === value ? 'is-selected' : ''} ${opt.disabled ? 'is-disabled' : ''}`}
              disabled={opt.disabled}
              role="option"
              aria-selected={opt.value === value}
            >
              <span className="custom-select-option__label">{opt.label}</span>
              {opt.value === value && <span className="custom-select-option__check">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
