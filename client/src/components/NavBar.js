import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavBar({ user, setUser }) {
  
  function handleLogout() {
    fetch('/logout', {
      method: 'DELETE',
    })
    .then(() => {
      setUser(null)
    })
  }

  return (
    <div>
      {user.length !== 0 ? (
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/find-events">SOCCER CONNECT ⚽</Navbar.Brand>
            <Nav className="me-auto" style={{ margin: "5px", gap: "30px" }}>
              <Nav.Link href="/find-events">Home</Nav.Link>
              <NavDropdown title="Events">
                <NavDropdown.Item href="/find-events">Find Events</NavDropdown.Item>
                <NavDropdown.Item href="/create">
                  Create an Event
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title={`Hi, ${user.first_name}!`}>
                <NavDropdown.Item href="/myprofile">
                  View my Profile
                </NavDropdown.Item>
                <NavDropdown.Item href="/" onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Container>
        </Navbar>
      ) : (
        <Navbar bg="dark" variant="dark">
          <Container>
            <Nav className="me-auto" style={{ margin: "5px", gap: "30px" }}>
              <Navbar.Brand href='/'>SOCCER CONNECT ⚽</Navbar.Brand>
              <Nav.Link href='/find-events'>View Events</Nav.Link>
              <Nav.Link href='login'>Log In</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      )}
    </div>
  );
}

export default NavBar;
