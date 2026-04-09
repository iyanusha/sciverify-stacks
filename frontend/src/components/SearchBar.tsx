'use client';

import { useRef, useEffect, useState } from 'react';
import { getRecentSearches, saveRecentSearch } from '@/lib/searchUtils';

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  loading?: boolean;
  resultCount?: number;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search publications...',
  loading = false,
  resultCount,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleFocus() {
    setRecentSearches(getRecentSearches());
    setFocused(true);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
  }

  function handleClear() {
    onChange('');
    inputRef.current?.focus();
  }

  function handleRecentClick(q: string) {
    onChange(q);
    saveRecentSearch(q);
    setFocused(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && value.trim()) {
      saveRecentSearch(value.trim());
      setFocused(false);
    }
  }

  const showDropdown = focused && value === '' && recentSearches.length > 0;

  return (
    <div className="relative w-full">
      <div className="relative flex items-center">
        {/* Search icon */}
        <svg
          className="absolute left-3 h-5 w-5 text-gray-400 pointer-events-none"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <circle cx="9" cy="9" r="6" />
          <path d="M15 15l4 4" strokeLinecap="round" />
        </svg>

        <input
          ref={inputRef}
          type="search"
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-label="Search publications"
          className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-24 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
        />

        <div className="absolute right-3 flex items-center gap-2">
          {loading && (
            <svg
              className="h-4 w-4 animate-spin text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              aria-label="Searching"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
          )}

          {!loading && value && (
            <button
              onClick={handleClear}
              aria-label="Clear search"
              className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}

          <span className="hidden rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-xs text-gray-400 md:inline">
            /
          </span>
        </div>
      </div>

      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute left-0 right-0 top-full z-50 mt-1 rounded-xl border border-gray-200 bg-white py-2 shadow-lg"
        >
          <p className="px-3 pb-1 text-xs font-medium text-gray-500">Recent searches</p>
          {recentSearches.map((q) => (
            <button
              key={q}
              onClick={() => handleRecentClick(q)}
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
            >
              <svg className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path d="M10 5v5l3 3" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="10" cy="10" r="8" />
              </svg>
              {q}
            </button>
          ))}
        </div>
      )}
      {/* Accessible live region for screen readers */}
      {!loading && value && resultCount !== undefined && (
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {resultCount === 0
            ? 'No results found'
            : `${resultCount} result${resultCount === 1 ? '' : 's'} found`}
        </p>
      )}
    </div>
  );
}
