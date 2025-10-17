"use client";
import { useState, useEffect, useRef } from "react";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export default function SearchBar({
  placeholder = "Search...",
  value = "",
  onChange,
  onSubmit,
  onFocus,
  onBlur,
}: SearchBarProps) {
  const [term, setTerm] = useState<string>(value);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Keep internal term synced with external value
  useEffect(() => {
    setTerm(value);
  }, [value]);

  const handleSubmit = () => {
    const trimmed = term.trim();
    if (trimmed) {
      onSubmit?.(trimmed);
      // Remove focus after submit (closes dropdown)
      inputRef.current?.blur();
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <label className="sr-only" htmlFor="search">
        Search
      </label>
      <div style={{ position: "relative" }}>
        <input
          id="search"
          ref={inputRef}
          type="text"
          value={term}
          onChange={(e) => {
            const val = e.target.value;
            setTerm(val);
            onChange?.(val);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmit();
            }
          }}
          onFocus={() => onFocus?.()}
          onBlur={() => onBlur?.()}
          autoComplete="off"
          placeholder={placeholder}
          className="input"
        />
        <div
          style={{
            position: "absolute",
            insetInlineEnd: "0.75rem",
            insetBlock: 0,
            display: "flex",
            alignItems: "center",
            pointerEvents: "none",
            color: "#94a3b8",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ width: 20, height: 20 }}
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 4.2 12.06l4.22 4.22a.75.75 0 1 0 1.06-1.06l-4.22-4.22A6.75 6.75 0 0 0 10.5 3.75ZM5.25 10.5a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
