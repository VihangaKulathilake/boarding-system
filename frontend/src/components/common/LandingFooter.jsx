import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function LandingFooter() {
    return (
        <footer className="bg-dark text-white py-5">
            <Container>
                <Row className="gy-4">
                    <Col lg={4}>
                        <h5 className="fw-bold mb-3 d-flex align-items-center">
                            <i className="bi bi-house-door-fill text-primary me-2"></i>
                            Boarding System
                        </h5>
                        <p className="text-white-50 small">
                            Making boarding house management simple, efficient, and transparent for everyone.
                        </p>
                        <div className="d-flex gap-3">
                            <a href="#" className="text-white-50 hover-text-white"><i className="bi bi-facebook fs-5"></i></a>
                            <a href="#" className="text-white-50 hover-text-white"><i className="bi bi-twitter fs-5"></i></a>
                            <a href="#" className="text-white-50 hover-text-white"><i className="bi bi-instagram fs-5"></i></a>
                            <a href="#" className="text-white-50 hover-text-white"><i className="bi bi-linkedin fs-5"></i></a>
                        </div>
                    </Col>
                    <Col lg={2} md={4} sm={6}>
                        <h6 className="fw-bold mb-3 text-uppercase small tracking-wider">Product</h6>
                        <ul className="list-unstyled small">
                            <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none hover-text-white">Features</a></li>
                            <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none hover-text-white">Pricing</a></li>
                            <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none hover-text-white">API</a></li>
                        </ul>
                    </Col>
                    <Col lg={2} md={4} sm={6}>
                        <h6 className="fw-bold mb-3 text-uppercase small tracking-wider">Company</h6>
                        <ul className="list-unstyled small">
                            <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none hover-text-white">About Us</a></li>
                            <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none hover-text-white">Careers</a></li>
                            <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none hover-text-white">Blog</a></li>
                        </ul>
                    </Col>
                    <Col lg={4} md={4}>
                        <h6 className="fw-bold mb-3 text-uppercase small tracking-wider">Newsletter</h6>
                        <p className="small text-white-50">Subscribe for the latest updates.</p>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control bg-dark border-secondary text-white" placeholder="Email address" />
                            <button className="btn btn-primary" type="button">Subscribe</button>
                        </div>
                    </Col>
                </Row>
                <hr className="border-secondary my-4" />
                <div className="text-center text-white-50 small">
                    &copy; {new Date().getFullYear()} Boarding System. All rights reserved.
                </div>
            </Container>
        </footer>
    );
}
