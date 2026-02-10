import React from 'react';
import { Navbar as BNavbar, Container, Nav, NavDropdown, Form } from 'react-bootstrap';

export default function AdminNavbar() {
    return (
        <BNavbar bg="primary" variant="dark" expand="lg" className="shadow-sm sticky-top mb-3">
            <Container>
                <BNavbar.Brand href="#home" className="d-flex align-items-center">
                    <i className="bi bi-house-heart-fill me-2 fs-4"></i>
                    <span className="brand-logo fs-4">StayMate</span>
                </BNavbar.Brand>
                <BNavbar.Toggle aria-controls="admin-navbar-nav" />
                <BNavbar.Collapse id="admin-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#dashboard" className="px-3">
                            <i className="bi bi-speedometer2 me-1"></i> Dashboard
                        </Nav.Link>
                        <Nav.Link href="#boardings" className="px-3">
                            <i className="bi bi-building me-1"></i> Boardings
                        </Nav.Link>
                        <Nav.Link href="#tenants" className="px-3">
                            <i className="bi bi-people me-1"></i> Tenants
                        </Nav.Link>
                        <Nav.Link href="#payments" className="px-3">
                            <i className="bi bi-cash-stack me-1"></i> Payments
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
                        <NavDropdown title={<><i className="bi bi-person-circle me-1"></i> Admin</>} id="admin-nav-dropdown" align="end">
                            <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
                            <NavDropdown.Item href="#settings">Settings</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#logout" className="text-danger">Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </BNavbar.Collapse>
            </Container>
        </BNavbar>
    );
}
