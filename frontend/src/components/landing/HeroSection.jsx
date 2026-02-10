import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

export default function HeroSection() {
    return (
        <div className="hero-section d-flex align-items-center position-relative overflow-hidden" style={{
            minHeight: '100vh',
            paddingTop: '100px',
            paddingBottom: '100px',
            backgroundSize: '400% 400%',
        }}>
            <div className="bg-animate-gradient position-absolute top-0 start-0 w-100 h-100 z-0"></div>

            {/* Geometric Overlay Pattern */}
            <div className="position-absolute top-0 start-0 w-100 h-100 z-0 opacity-10" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
                backgroundSize: '40px 40px'
            }}></div>

            <Container className="position-relative z-1">
                <Row className="align-items-center">
                    <Col lg={6} className="text-white mb-5 mb-lg-0 text-center text-lg-start">
                        <div className="d-inline-block px-3 py-1 rounded-pill bg-white bg-opacity-25 border border-white border-opacity-25 mb-4 animate-fade-in-up backdrop-blur">
                            <span className="small fw-bold">🚀 Redefining Property Management</span>
                        </div>

                        <h1 className="display-3 fw-black mb-4 animate-fade-in-up delay-100 ls-tight">
                            Manage Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-warning to-danger" style={{
                                backgroundImage: 'linear-gradient(45deg, #FFD700, #FF6B6B)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>Creative Space</span>
                        </h1>

                        <p className="lead mb-5 opacity-90 animate-fade-in-up delay-200 mx-auto mx-lg-0" style={{ fontWeight: '300', maxWidth: '600px' }}>
                            StayMate isn't just a tool; it's your creative partner in managing boarding houses. Experience vibrant analytics, colorful insights, and seamless control.
                        </p>

                        <div className="d-flex gap-3 animate-fade-in-up delay-300 justify-content-center justify-content-lg-start flex-column flex-sm-row">
                            <Button variant="light" size="lg" className="rounded-pill px-5 py-3 fw-bold text-primary shadow-lg hover-scale">
                                Start Creating
                            </Button>
                            <Button variant="outline-light" size="lg" className="rounded-pill px-5 py-3 fw-bold hover-scale backdrop-blur">
                                Explore Features
                            </Button>
                        </div>
                    </Col>

                    <Col lg={6} className="position-relative animate-fade-in delay-300 d-flex justify-content-center align-items-center mt-4 mt-lg-0">
                        {/* Sole Creative Logo Composition */}
                        <div className="position-relative animate-float">
                            <div className="hero-logo-container bg-white bg-opacity-10 backdrop-blur rounded-circle p-5 shadow-2xl border border-white border-opacity-25 d-flex align-items-center justify-content-center"
                                style={{ width: '350px', height: '350px', transition: 'all 0.3s ease' }}>
                                <div className="text-center">
                                    <div className="hero-logo-circle bg-gradient-primary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 shadow-lg"
                                        style={{ width: '120px', height: '120px', background: 'linear-gradient(135deg, #FFD700 0%, #FF6B6B 100%)', transition: 'all 0.3s ease' }}>
                                        <i className="hero-logo-icon bi bi-house-heart-fill text-white" style={{ fontSize: '4rem', transition: 'all 0.3s ease' }}></i>
                                    </div>
                                    <h1 className="hero-logo-text display-4 fw-black text-white mb-0 ls-tight" style={{ transition: 'all 0.3s ease' }}>StayMate</h1>
                                    <div className="d-flex justify-content-center mt-2">
                                        <div className="bg-white rounded-pill" style={{ width: '40px', height: '4px' }}></div>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Orbiting Elements */}
                            <div className="position-absolute top-0 start-0 w-100 h-100 border border-white border-opacity-10 rounded-circle"
                                style={{ transform: 'scale(1.2)', zIndex: -1 }}></div>
                            <div className="position-absolute top-0 start-0 w-100 h-100 border border-white border-opacity-5 rounded-circle"
                                style={{ transform: 'scale(1.5)', zIndex: -2 }}></div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
