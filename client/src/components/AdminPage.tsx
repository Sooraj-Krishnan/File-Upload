// src/components/AdminPage.tsx
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
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
              <h2>Admin Dashboard</h2>
              <button onClick={handleLogout}>Logout</button>
              <FileUpload />
            </div>
          ) : (
            <div>
              <h2>Login</h2>
              <button onClick={() => setShowLoginModal(true)}>Login</button>
            </div>
          )}
    
          {/* Login Modal */}
          <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Form.Text className="text-muted">Enter your email here</Form.Text>
                </Form.Group>
    
                <Form.Group controlId="formBasicPassword">
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
