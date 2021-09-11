import React, { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { UserContext } from '../../App';
import { useHistory } from 'react-router';

const Header = () => {
    const history = useHistory();
    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
    const handleLogOut = () => {
        setLoggedInUser({})
        localStorage.clear();
        history.push("/")
    }

    const localUser = JSON.parse(localStorage.getItem('user')) || {};
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/">NEWS DAILY</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="/"><i class="fas fa-home"></i> Home</Nav.Link>
                        {loggedInUser.email || localUser.email ? <Nav.Link onClick={handleLogOut}><i class="fas fa-user"></i> Log out</Nav.Link> : <Nav.Link href="/login"><i class="fas fa-user"></i> Login</Nav.Link>}
                        <Nav.Link href="/addnews"><i class="fas fa-user-shield"></i>Admin</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;