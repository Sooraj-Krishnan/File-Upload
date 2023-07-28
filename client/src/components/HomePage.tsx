import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const HomePage: React.FC = () => {
  const [fileId, setFileId] = useState<number | null>(null);
 //  const [fileName, setFileName] = useState<string | null>(null); // State to hold the file name

 const [showSuccessToast, setShowSuccessToast] = useState(false);
 const [showErrorToast, setShowErrorToast] = useState(false);

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
              setShowSuccessToast(true); // Show the toast when download is successful
            });
          } else {
            // Handle error
            console.error('File download failed.');
            setShowErrorToast(true);
          }
        })
        .catch((error) => {
          console.error('Error while fetching:', error);
        });
    }
};
               const handleCloseSuccessToast = () => {
              setShowSuccessToast(false);
               };

               const handleCloseErrorToast = () => {
               setShowErrorToast(false);
              };
       
  return (
    <div>
      <h2>Home Page</h2>
      
        <input type="text" placeholder="Enter File ID" onChange={handleFileIdChange} />
        <button onClick={handleDownload}>Download</button>

        <ToastContainer className="p-3 d-flex justify-content-center">
        { /* Success Toast */}
        <Toast show={showSuccessToast} onClose={handleCloseSuccessToast} bg="success" delay={3000} autohide>
          <Toast.Body>File download successful!</Toast.Body>
        </Toast>

        {/* Error Toast */}
        <Toast show={showErrorToast} onClose={handleCloseErrorToast} bg="danger" delay={3000} autohide>
          <Toast.Body>File download failed!</Toast.Body>
        </Toast>
      </ToastContainer>
     
    </div>
  );
};

export default HomePage;
