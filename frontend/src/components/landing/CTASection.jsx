import React from 'react';
import { Container, Button } from 'react-bootstrap';

export default function CTASection() {
    return (
        <section className="py-5 text-white text-center position-relative overflow-hidden"
            style={{
                backgroundSize: '400% 400%',
                zIndex: 1
            }}>

            <div className="bg-animate-gradient position-absolute top-0 start-0 w-100 h-100 z-0"></div>

            {/* Geometric Overlay Pattern */}
            <div className="position-absolute top-0 start-0 w-100 h-100 z-0 opacity-10" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
                backgroundSize: '40px 40px'
            }}></div>

            <Container className="py-5 position-relative z-1">
                <h2 className="display-4 fw-bold mb-4 animate-fade-in-up">Ready to Transform Your Management?</h2>
                <p className="lead mb-5 opacity-90 mx-auto animate-fade-in-up delay-100" style={{ maxWidth: '700px' }}>
                    Join thousands of boarding house owners who trust StayMate for their daily operations.
                </p>
                <div className="animate-fade-in-up delay-200">
                    <Button variant="light" size="lg" className="rounded-pill px-5 py-3 fw-bold text-primary shadow-lg hover-scale hover-glow">
                        Start Your Free Trial
                    </Button>
                </div>
                <p className="mt-4 small opacity-75 animate-fade-in-up delay-300">
                    <i className="bi bi-check-circle-fill me-1"></i> No credit card required &nbsp;&bull;&nbsp;
                    <i className="bi bi-check-circle-fill me-1 ms-2"></i> Cancel anytime
                </p>
            </Container>
        </section>
    );
}
