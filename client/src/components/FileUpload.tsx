
import React, { useState } from 'react';

const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileId, setFileId] = useState<number | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleUpload = () => {
    // Your file upload logic here (e.g., using a backend server to save the file and generate fileId)
    // Once fileId is generated, you can set it using setFileId()
    const randomFileId = Math.floor(Math.random() * 1000) + 1;
    setFileId(randomFileId);
  };

  return (
    <div>
      <h3>Upload File</h3>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {fileId && <p>File uploaded successfully. File ID: {fileId}</p>}
    </div>
  );
};

export default FileUpload;
