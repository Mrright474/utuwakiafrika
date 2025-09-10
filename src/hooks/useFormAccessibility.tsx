import { useRef, useCallback } from 'react';

interface FormError {
  field: string;
  message: string;
}

export const useFormAccessibility = () => {
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const firstErrorRef = useRef<HTMLElement>(null);

  const announceErrors = useCallback((errors: FormError[]) => {
    if (errors.length > 0 && errorSummaryRef.current) {
      // Update the error summary content
      const errorList = errors.map(error => `${error.field}: ${error.message}`).join('. ');
      errorSummaryRef.current.textContent = `Form has ${errors.length} error${errors.length > 1 ? 's' : ''}: ${errorList}`;
      
      // Focus the first field with an error
      if (firstErrorRef.current) {
        firstErrorRef.current.focus();
      }
    }
  }, []);

  const getFieldErrorProps = useCallback((fieldName: string, hasError: boolean) => {
    return {
      'aria-invalid': hasError,
      'aria-describedby': hasError ? `${fieldName}-error` : undefined,
    };
  }, []);

  const getErrorMessageProps = useCallback((fieldName: string) => {
    return {
      id: `${fieldName}-error`,
      role: 'alert',
      'aria-live': 'polite' as const,
    };
  }, []);

  const ErrorSummary = useCallback(({ errors }: { errors: FormError[] }) => {
    if (errors.length === 0) return null;

    return (
      <div
        ref={errorSummaryRef}
        role="alert"
        aria-live="assertive"
        className="sr-only"
      />
    );
  }, []);

  return {
    announceErrors,
    getFieldErrorProps,
    getErrorMessageProps,
    ErrorSummary,
    firstErrorRef,
  };
};