import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ValidationMessageProps {
  message?: string;
  type?: 'error' | 'warning' | 'info';
}

export const ValidationMessage: React.FC<ValidationMessageProps> = ({
  message,
  type = 'error'
}) => {
  if (!message) return null;

  const colorClass =
    type === 'error'
      ? 'val-msg-error'
      : type === 'warning'
      ? 'val-msg-warning'
      : 'val-msg-info';

  return (
    <div className={`val-msg ${colorClass}`} role="alert" aria-live="polite">
      <AlertCircle size={14} className="val-msg-icon" />
      <span>{message}</span>
    </div>
  );
};
