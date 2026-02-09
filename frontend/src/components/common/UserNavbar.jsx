import React from 'react';
import { Navbar as BNavbar, Container, Nav, NavDropdown, Form } from 'react-bootstrap';

export default function UserNavbar() {
    return (
        <BNavbar bg="primary" variant="dark" expand="lg" className="shadow-sm sticky-top mb-3">
            <Container>
                <BNavbar.Brand href="#home" className="fw-bold">
                    <i className="bi bi-house-door-fill me-2"></i>Boarding System
                </BNavbar.Brand>
                <BNavbar.Toggle aria-controls="user-navbar-nav" />
                <BNavbar.Collapse id="user-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home" className="px-3">
                            <i className="bi bi-house me-1"></i> Home
                        </Nav.Link>
                        <Nav.Link href="#my-room" className="px-3">
                            <i className="bi bi-door-open me-1"></i> My Room
                        </Nav.Link>
                        <Nav.Link href="#payments" className="px-3">
                            <i className="bi bi-credit-card me-1"></i> Pay Rent
                        </Nav.Link>
                        <Nav.Link href="#support" className="px-3">
                            <i className="bi bi-headset me-1"></i> Support
                        </Nav.Link>
                    </Nav>
                    <Form className="d-flex me-2">
                        <Form.Control
                            type="search"
                            placeholder="Search..."
                            className="me-2 navbar-search rounded-pill bg-light border-0"
                            aria-label="Search"
                        />
                    </Form>
                    <Nav>
                        <NavDropdown title={<><i className="bi bi-person-circle me-1"></i> User</>} id="user-nav-dropdown" align="end">
                            <NavDropdown.Item href="#profile">My Profile</NavDropdown.Item>
                            <NavDropdown.Item href="#history">Payment History</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#logout" className="text-danger">Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </BNavbar.Collapse>
            </Container>
        </BNavbar>
    );
}
