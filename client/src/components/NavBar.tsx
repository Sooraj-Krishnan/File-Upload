
import { Link, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export const NavBar = () => {
 
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
  };
  return (

      <Navbar bg="light" data-bs-theme="light">
        <Container>
         <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/admin" style={{ margin: "0 50px" }}>Admin</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  );
};

export default NavBar 