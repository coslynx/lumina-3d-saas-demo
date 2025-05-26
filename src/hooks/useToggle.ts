import React, { useState, useCallback } from 'react';

/**
 * Defines the output type of the `useToggle` hook.
 */
interface UseToggleOutput {
  /** The current toggle state. */
  value: boolean;
  /** Function to toggle the state. */
  toggle: () => void;
  /** Function to set the state to true. */
  setTrue: () => void;
  /** Function to set the state to false. */
  setFalse: () => void;
}

/**
 * Custom React hook for managing a boolean toggle state.
 *
 * @param initialValue - Optional initial value for the toggle state. Defaults to `false`.
 * @returns An object containing the current value and functions to toggle or set the value.
 *
 * @example
 * const { value, toggle, setTrue, setFalse } = useToggle(true);
 */
const useToggle = (initialValue: boolean = false): UseToggleOutput => {
  if (typeof initialValue !== 'boolean') {
    throw new Error('initialValue must be a boolean');
  }

  const [value, setValue] = useState<boolean>(initialValue);

  /**
   * Toggles the boolean value.
   */
  const toggle = useCallback(() => {
    setValue((prevValue) => !prevValue);
  }, []);

  /**
   * Sets the value to true.
   */
  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  /**
   * Sets the value to false.
   */
  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  return {
    value,
    toggle,
    setTrue,
    setFalse,
  };
};

export default useToggle;