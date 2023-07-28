// src/components/AdminPage.tsx
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import FileUpload from './FileUpload';

const AdminPage: React.FC = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = () => {
      // Placeholder for login logic (for demo purposes)
      
      const dummyEmail = 'admin@example.com';
      const dummyPassword = 'admin123';
  
      if (email === dummyEmail && password === dummyPassword) {
        setLoggedIn(true);
        setShowLoginModal(false);
      } else {
        alert('Invalid credentials. Please try again.');
      }
    };
  
    const handleLogout = () => {
     
      // In a real-world scenario, we will clear any authentication tokens or session data.
      setLoggedIn(false);
    };
  
    return (
        <div>
          {loggedIn ? (
            <div>
              <button onClick={handleLogout}
              className="btn btn-secondary position-absolute top-0 mr-3"
              style={{ right: 0, marginTop: '10px' }}>Logout</button>
              <h2 className="d-flex justify-content-center align-items-center" style={{ minHeight: '10vh' }}>Welcome Admin </h2>
              <FileUpload />
            </div>
          ) : (
            <div>
              <h3 className="mr-2">Please Login to upload files </h3>
              <button onClick={() => setShowLoginModal(true)}>Login</button>
            </div>
          )}
    
          {/* Login Modal */}
          <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)}>
          
            <Modal.Body>
              <Form className="d-flex justify-content-center flex-column">
                <Form.Group controlId="formBasicEmail" style={{ marginBottom: '1rem' }}>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                  />
                  <Form.Text className="text-muted">Enter your email here</Form.Text>
                </Form.Group>
    
                <Form.Group controlId="formBasicPassword" style={{ marginBottom: '1rem' }}>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="admin123"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Form.Text className="text-muted">Enter your password here</Form.Text>
                </Form.Group>
              </Form>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowLoginModal(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={handleLogin}>
                Login
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    };

export default AdminPage;
