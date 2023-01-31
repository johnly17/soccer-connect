import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from 'react-bootstrap/NavDropdown';


function NavBar() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Soccer Connect</Navbar.Brand>
          <Nav className="me-auto" style={{margin: '5px', gap: '30px'}}>
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title='Events'>
                <NavDropdown.Item href="/events">Find Events</NavDropdown.Item>
                <NavDropdown.Item href="/create">Create an Event</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/myprofile">Profile</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/signup">Sign Up</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar
