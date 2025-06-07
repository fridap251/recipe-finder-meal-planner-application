import React, { useState, useRef } from 'react';
import { Upload, X, Camera } from 'lucide-react';
import { cn } from '../lib/utils';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, className }) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setError(null);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setError(null);
    
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);
    onImageUpload(file);
  };

  const removeImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    setError(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className={cn("relative", className)}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
      
      {!preview ? (
        <div 
          onDragEnter={handleDrag}
          onClick={triggerFileInput}
          className={cn(
            "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200",
            dragActive 
              ? "border-primary-500 bg-primary-50" 
              : "border-gray-300 hover:border-primary-400 hover:bg-gray-50"
          )}
        >
          {dragActive ? (
            <div className="flex flex-col items-center py-4">
              <Upload className="w-10 h-10 text-primary-500 mb-2" />
              <p className="text-primary-600 font-medium">Drop image here</p>
            </div>
          ) : (
            <div className="flex flex-col items-center py-4">
              <Camera className="w-10 h-10 text-gray-400 mb-2" />
              <p className="text-gray-700 font-medium">Upload a food image</p>
              <p className="text-sm text-gray-500 mt-1">or drag and drop here</p>
              <p className="text-xs text-gray-400 mt-2">Maximum size: 5MB</p>
            </div>
          )}
        </div>
      ) : (
        <div className="relative rounded-lg overflow-hidden">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full h-48 object-cover"
          />
          <button
            onClick={removeImage}
            className="absolute top-2 right-2 p-1 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-colors"
            aria-label="Remove image"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {error && (
        <p className="mt-2 text-sm text-error-600">{error}</p>
      )}

      {dragActive && (
        <div 
          className="absolute inset-0 w-full h-full z-50"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        ></div>
      )}
    </div>
  );
};

export default ImageUpload;