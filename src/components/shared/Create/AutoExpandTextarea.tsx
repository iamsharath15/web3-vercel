import React, { useRef, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { UseFormSetValue } from 'react-hook-form';

interface AutoExpandTextareaProps {
  value: string;
  setValue: UseFormSetValue<any>;
  name: string;
  placeholder?: string;
  maxLength?: number;
  className?: string;
}

const AutoExpandTextarea: React.FC<AutoExpandTextareaProps> = ({
  value,
  setValue,
  name,
  placeholder = 'Enter text...',
  maxLength = 140,
  className = '',
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "60px";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
        <Textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => setValue(name, e.target.value)}
      placeholder={placeholder}
      className={`min-h-0 p-0 resize-none placeholder:text-white/40 overflow-hidden bg-transparent border-none focus-visible:ring-offset-0 focus-visible:border-0 focus-visible:ring-0 focus-visible:ring-transparent focus:outline-none focus:border-0 ${className}`}
      maxLength={maxLength}
    />
  );
};

export default AutoExpandTextarea;
