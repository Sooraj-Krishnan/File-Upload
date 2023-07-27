
import React, { useState } from 'react';

const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileId, setFileId] = useState<number | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleUpload = () => {
   
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      fetch('http://localhost:5000/files/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          setFileId(data.fileId); // Set the fileId returned from the server
        })
        .catch((error) => {
          console.error('Error while uploading:', error);
        });
    }
  

    const randomFileId = Math.floor(Math.random() * 1000) + 1;
    setFileId(randomFileId);
  };

  return (
    <div>
      <h3>Upload File</h3>
      <input type="file" accept=".jpg, .jpeg, .png, .pdf, .doc, .docx" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {fileId && <p>File uploaded successfully. File ID: {fileId}</p>}
    </div>
  );
};

export default FileUpload;
