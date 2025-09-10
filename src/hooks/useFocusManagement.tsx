import { useEffect, useRef, RefObject } from 'react';

interface UseFocusManagementOptions {
  trapFocus?: boolean;
  restoreFocus?: boolean;
  autoFocus?: boolean;
}

export const useFocusManagement = (
  isOpen: boolean,
  options: UseFocusManagementOptions = {}
): RefObject<HTMLElement> => {
  const { trapFocus = true, restoreFocus = true, autoFocus = true } = options;
  const containerRef = useRef<HTMLElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Store the previously focused element
    previousActiveElement.current = document.activeElement as HTMLElement;

    // Auto-focus the first focusable element in the container
    if (autoFocus && containerRef.current) {
      const focusableElements = getFocusableElements(containerRef.current);
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }

    // Set up focus trap
    if (trapFocus) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Tab' && containerRef.current) {
          trapFocusInContainer(e, containerRef.current);
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, autoFocus, trapFocus]);

  useEffect(() => {
    return () => {
      // Restore focus when component unmounts or closes
      if (restoreFocus && previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen, restoreFocus]);

  return containerRef;
};

const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'textarea:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ');

  return Array.from(container.querySelectorAll(focusableSelectors)) as HTMLElement[];
};

const trapFocusInContainer = (e: KeyboardEvent, container: HTMLElement) => {
  const focusableElements = getFocusableElements(container);
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (e.shiftKey && document.activeElement === firstElement) {
    e.preventDefault();
    lastElement?.focus();
  } else if (!e.shiftKey && document.activeElement === lastElement) {
    e.preventDefault();
    firstElement?.focus();
  }
};

export const useKeyboardNavigation = (
  items: HTMLElement[],
  isOpen: boolean
) => {
  const currentIndex = useRef<number>(-1);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          currentIndex.current = Math.min(currentIndex.current + 1, items.length - 1);
          items[currentIndex.current]?.focus();
          break;
        case 'ArrowUp':
          e.preventDefault();
          currentIndex.current = Math.max(currentIndex.current - 1, 0);
          items[currentIndex.current]?.focus();
          break;
        case 'Home':
          e.preventDefault();
          currentIndex.current = 0;
          items[0]?.focus();
          break;
        case 'End':
          e.preventDefault();
          currentIndex.current = items.length - 1;
          items[items.length - 1]?.focus();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [items, isOpen]);

  return currentIndex.current;
};