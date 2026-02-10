import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

export default function BenefitsSection() {
    return (
        <section className="py-5 bg-light" id="benefits">
            <Container className="py-5">
                <Row className="align-items-center">
                    <Col lg={6} className="mb-5 mb-lg-0">
                        <Image
                            src="https://placehold.co/600x400/png?text=Mobile+Friendly"
                            alt="Mobile Friendly"
                            fluid
                            className="rounded-4 shadow-lg"
                        />
                    </Col>
                    <Col lg={6} className="ps-lg-5">
                        <span className="text-primary fw-bold text-uppercase tracking-wider">Why Choose Us</span>
                        <h2 className="display-5 fw-bold mb-4">Designed for Modern Living</h2>
                        <ul className="list-unstyled">
                            <li className="d-flex align-items-start mb-4">
                                <i className="bi bi-check-circle-fill text-success fs-4 me-3 mt-1"></i>
                                <div>
                                    <h4 className="fw-bold h5">Mobile First Design</h4>
                                    <p className="text-muted">Access your dashboard from anywhere, on any device. Perfect for improved on-the-go management.</p>
                                </div>
                            </li>
                            <li className="d-flex align-items-start mb-4">
                                <i className="bi bi-check-circle-fill text-success fs-4 me-3 mt-1"></i>
                                <div>
                                    <h4 className="fw-bold h5">Transparent Communication</h4>
                                    <p className="text-muted">Built-in messaging and notifications ensure everyone stays on the same page.</p>
                                </div>
                            </li>
                            <li className="d-flex align-items-start">
                                <i className="bi bi-check-circle-fill text-success fs-4 me-3 mt-1"></i>
                                <div>
                                    <h4 className="fw-bold h5">Cost Effective</h4>
                                    <p className="text-muted">Save time and money with automated tools that reduce administrative overhead.</p>
                                </div>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}
