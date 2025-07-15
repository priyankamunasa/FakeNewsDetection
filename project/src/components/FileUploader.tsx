import React from 'react';
import { Upload, FileText, AlertCircle } from 'lucide-react';

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
  dragOver: boolean;
  setDragOver: (dragOver: boolean) => void;
  selectedFile: File | null;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  onFileUpload,
  dragOver,
  setDragOver,
  selectedFile
}) => {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'text/csv') {
      onFileUpload(droppedFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <FileText className="text-blue-600" />
        Upload News Dataset
      </h2>
      
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
          dragOver
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
      >
        <Upload className="mx-auto mb-4 text-gray-400" size={48} />
        <p className="text-lg text-gray-600 mb-4">
          Drag and drop your CSV file here, or click to select
        </p>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileSelect}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer font-medium"
        >
          Choose File
        </label>
        
        {selectedFile && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-medium">
              Selected: {selectedFile.name}
            </p>
            <p className="text-green-600 text-sm">
              Size: {(selectedFile.size / 1024).toFixed(2)} KB
            </p>
          </div>
        )}
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <AlertCircle className="text-blue-600 mt-0.5 flex-shrink-0" size={16} />
          <div>
            <h3 className="font-medium text-blue-800 mb-1">CSV Format Requirements:</h3>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• Must contain "title" and "text" columns</li>
              <li>• UTF-8 encoding recommended</li>
              <li>• Headers should be in the first row</li>
              <li>• Maximum file size: 10MB</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};