'use client';

import { useState, useRef, ChangeEvent } from 'react';
import styled from 'styled-components';
import { colors, spacing, borderRadius } from '@/lib/theme';

const FileUploadContainer = styled.div`
  border: 2px dashed ${colors.grey3};
  border-radius: ${borderRadius.small};
  padding: ${spacing.large};
  text-align: center;
  margin-bottom: ${spacing.base};
  transition: border-color 0.3s;
  
  &:hover {
    border-color: ${colors.moss};
  }
`;

const FileInput = styled.input.attrs({ type: 'file' })`
  display: none;
`;

const FileLabel = styled.label`
  display: block;
  cursor: pointer;
  color: ${colors.moss};
  font-weight: 500;
`;

const FileName = styled.p`
  margin-top: ${spacing.small};
  font-size: 0.875rem;
  color: ${colors.grey4};
`;

const ErrorMessage = styled.p`
  color: ${colors.error};
  font-size: 0.875rem;
  margin-top: ${spacing.xsmall};
`;

export interface FileUploadProps {
  onFileChange: (file: File | null) => void;
  accept?: string;
  maxSizeMB?: number;
  error?: string;
}

export default function FileUpload({
  onFileChange,
  accept = '.pdf,.doc,.docx',
  maxSizeMB = 5,
  error,
}: FileUploadProps) {
  const [fileName, setFileName] = useState<string>('');
  const [fileError, setFileError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      const maxSizeBytes = maxSizeMB * 1024 * 1024;
      
      if (file.size > maxSizeBytes) {
        setFileError(`File size exceeds the maximum limit of ${maxSizeMB}MB.`);
        setFileName('');
        onFileChange(null);
        return;
      }
      
      setFileName(file.name);
      setFileError('');
      onFileChange(file);
    } else {
      setFileName('');
      setFileError('');
      onFileChange(null);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <FileUploadContainer onClick={handleClick}>
        <FileInput
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={accept}
        />
        <FileLabel>
          {fileName ? 'Change Resume/CV' : 'Upload Resume/CV'}
        </FileLabel>
        {fileName && <FileName>{fileName}</FileName>}
      </FileUploadContainer>
      {(fileError || error) && <ErrorMessage>{fileError || error}</ErrorMessage>}
    </div>
  );
} 