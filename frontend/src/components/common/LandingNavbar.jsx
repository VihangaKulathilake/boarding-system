import React, { useState, useEffect } from 'react';
import { Navbar as BNavbar, Container, Nav, Button } from 'react-bootstrap';

export default function LandingNavbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <BNavbar
            bg={scrolled ? "white" : "transparent"}
            variant={scrolled ? "light" : "dark"}
            expand="lg"
            fixed="top"
            className={`transition-all ${scrolled ? 'shadow-sm py-2' : 'py-3'}`}
            style={{ transition: 'all 0.3s ease' }}
        >
            <Container>
                <BNavbar.Brand href="#home" className={`d-flex align-items-center ${scrolled ? 'text-primary' : 'text-white'}`}>
                    <i className="bi bi-house-heart-fill me-2 fs-4"></i>
                    <span className="brand-logo fs-3">StayMate</span>
                </BNavbar.Brand>
                <BNavbar.Toggle aria-controls="landing-navbar-nav" />
                <BNavbar.Collapse id="landing-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        <Nav.Link href="#home" className={`px-3 fw-medium ${scrolled ? 'text-dark' : 'text-white'}`}>Home</Nav.Link>
                        <Nav.Link href="#features" className={`px-3 fw-medium ${scrolled ? 'text-dark' : 'text-white'}`}>Features</Nav.Link>
                        <Nav.Link href="#about" className={`px-3 fw-medium ${scrolled ? 'text-dark' : 'text-white'}`}>About</Nav.Link>
                        <Nav.Link href="#contact" className={`px-3 fw-medium ${scrolled ? 'text-dark' : 'text-white'}`}>Contact</Nav.Link>
                        <div className="ms-3 d-flex gap-2">
                            <Button variant={scrolled ? "outline-primary" : "outline-light"} className="rounded-pill px-4" size="sm">
                                Login
                            </Button>
                            <Button variant={scrolled ? "primary" : "light"} className={`rounded-pill px-4 ${!scrolled && 'text-primary fw-bold'}`} size="sm">
                                Get Started
                            </Button>
                        </div>
                    </Nav>
                </BNavbar.Collapse>
            </Container>
        </BNavbar>
    );
}
