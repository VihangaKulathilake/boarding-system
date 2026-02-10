import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Register() {
    return (
        <div className="d-flex min-vh-100 overflow-hidden">
            {/* Left Side - Visual */}
            <Col lg={6} className="d-none d-lg-flex bg-primary align-items-center justify-content-center position-relative overflow-hidden">
                <div className="bg-animate-gradient position-absolute top-0 start-0 w-100 h-100 z-0 op-50"></div>

                {/* Geometric Overlay */}
                <div className="position-absolute top-0 start-0 w-100 h-100 z-1 opacity-10" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }}></div>

                <div className="position-relative z-2 text-center text-white p-5">
                    <div className="bg-white bg-opacity-10 backdrop-blur rounded-circle p-4 shadow-lg d-inline-block mb-4">
                        <div className="bg-gradient-primary rounded-circle d-flex align-items-center justify-content-center mx-auto shadow-lg"
                            style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #FFD700 0%, #FF6B6B 100%)' }}>
                            <i className="bi bi-person-plus-fill text-white fs-1"></i>
                        </div>
                    </div>
                    <h2 className="display-4 fw-black mb-3">Join StayMate Framework</h2>
                    <p className="lead opacity-75">Start your journey to smarter property management today.</p>
                </div>
            </Col>

            {/* Right Side - Signup Form */}
            <Col lg={6} className="d-flex align-items-center justify-content-center bg-light position-relative py-5">
                {/* Mobile Background (Light Gradient) */}
                <div className="position-absolute top-0 start-0 w-100 h-100 d-lg-none bg-primary opacity-10"></div>

                <Container style={{ maxWidth: '500px' }} className="position-relative z-1 px-4">
                    <div className="text-center mb-5 d-lg-none">
                        <div className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle p-3 shadow-sm mb-3">
                            <i className="bi bi-house-heart-fill text-primary fs-2"></i>
                        </div>
                        <h3 className="fw-bold text-primary">StayMate</h3>
                    </div>

                    <div className="mb-4">
                        <h2 className="fw-bold display-6">Create Account</h2>
                        <p className="text-muted">Get started with your free account.</p>
                    </div>

                    <Form>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formFirstName">
                                    <Form.Label className="fw-semibold">First Name</Form.Label>
                                    <Form.Control type="text" placeholder="John" size="lg" className="rounded-4 border-0 shadow-sm px-4 py-3" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="formLastName">
                                    <Form.Label className="fw-semibold">Last Name</Form.Label>
                                    <Form.Control type="text" placeholder="Doe" size="lg" className="rounded-4 border-0 shadow-sm px-4 py-3" />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label className="fw-semibold">Email address</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com" size="lg" className="rounded-4 border-0 shadow-sm px-4 py-3" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label className="fw-semibold">Password</Form.Label>
                            <Form.Control type="password" placeholder="Create a password" size="lg" className="rounded-4 border-0 shadow-sm px-4 py-3" />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="formRole">
                            <Form.Label className="fw-semibold">I am a...</Form.Label>
                            <div className="d-flex gap-3">
                                <div className="flex-fill">
                                    <input type="radio" className="btn-check" name="role" id="role-landlord" autoComplete="off" defaultChecked />
                                    <label className="btn btn-outline-primary w-100 rounded-pill py-2 fw-semibold" htmlFor="role-landlord">Landlord</label>
                                </div>
                                <div className="flex-fill">
                                    <input type="radio" className="btn-check" name="role" id="role-tenant" autoComplete="off" />
                                    <label className="btn btn-outline-primary w-100 rounded-pill py-2 fw-semibold" htmlFor="role-tenant">Tenant</label>
                                </div>
                            </div>
                        </Form.Group>

                        <Button variant="primary" type="submit" size="lg" className="w-100 rounded-pill py-3 fw-bold shadow-sm hover-scale mb-4">
                            Sign Up
                        </Button>

                        <div className="text-center mb-4">
                            <span className="text-muted bg-light px-2 position-relative z-1">Or sign up with</span>
                            <div className="border-bottom position-relative" style={{ top: '-12px', zIndex: 0 }}></div>
                        </div>

                        <div className="d-flex gap-3 mb-4">
                            <Button variant="white" className="w-100 rounded-pill border shadow-sm py-2 d-flex align-items-center justify-content-center gap-2 hover-scale bg-white">
                                <i className="bi bi-google text-danger"></i> Google
                            </Button>
                            <Button variant="white" className="w-100 rounded-pill border shadow-sm py-2 d-flex align-items-center justify-content-center gap-2 hover-scale bg-white">
                                <i className="bi bi-facebook text-primary"></i> Facebook
                            </Button>
                        </div>

                        <div className="text-center">
                            <p className="text-muted">Already have an account? <Link to="/login" className="fw-bold text-primary text-decoration-none">Sign in</Link></p>
                        </div>
                    </Form>
                </Container>
            </Col>
        </div>
    );
}
