import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Nav>
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/create-author">Create Author</Nav.Link>
          <Nav.Link as={Link} to="/create-blog">Create Blog</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    
);
}

export default NavBar;