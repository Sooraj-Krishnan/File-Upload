import React, { useState } from 'react';

const HomePage: React.FC = () => {
  const [fileId, setFileId] = useState<number | null>(null);
 //  const [fileName, setFileName] = useState<string | null>(null); // State to hold the file name

  const handleFileIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = Number(event.target.value) || null;
    setFileId(id);
  };

  
  const handleDownload = () => {
    if (fileId) {
      fetch(`http://localhost:5000/files/download/${fileId}`, {
        method: 'GET',
      })
        .then((response) => {
          if (response.ok) {
            
            const contentDisposition = response.headers.get('Content-Disposition');
            console.log('Content-Disposition:', contentDisposition);
            // const match = contentDisposition && contentDisposition.match(/filename="(.+)"/);
            const match = contentDisposition && contentDisposition.match(/filename=([^;]+)/);
            console.log('Match result:', match);
           
            const fileNameFromServer = match ? match[1].trim().replace(/[' "]/g, '') : 'file';
            console.log('File name from server:', fileNameFromServer);
            

            // Set the file name and trigger file download
            response.blob().then((blob) => {
              const url = window.URL.createObjectURL(new Blob([blob]));
              const a = document.createElement('a');
              a.href = url;
              a.download = fileNameFromServer; // Set the actual file name dynamically
              document.body.appendChild(a);
              a.click();
              a.remove();
            });
          } else {
            // Handle error
            console.error('File download failed.');
          }
        })
        .catch((error) => {
          console.error('Error while fetching:', error);
        });
    }
  };

  return (
    <div>
      <h2>Home Page</h2>
      <input type="text" placeholder="Enter File ID" onChange={handleFileIdChange} />
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default HomePage;
