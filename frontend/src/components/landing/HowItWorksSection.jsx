import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const steps = [
    {
        number: '01',
        title: 'Sign Up & Setup',
        description: 'Create your account and set up your property profile in minutes. Add rooms, amenities, and pricing details.',
        icon: 'bi-person-plus-fill',
        color: 'primary'
    },
    {
        number: '02',
        title: 'Add Tenants',
        description: 'Input tenant details and assign them to rooms easily. Send invitations for them to join the platform.',
        icon: 'bi-people-fill',
        color: 'success'
    },
    {
        number: '03',
        title: 'Manage & Track',
        description: 'Monitor payments, handle maintenance requests, and watch your business grow with real-time analytics.',
        icon: 'bi-graph-up-arrow',
        color: 'info'
    }
];

export default function HowItWorksSection() {
    return (
        <section className="py-5 bg-white" id="how-it-works">
            <Container className="py-5">
                <div className="text-center mb-5">
                    <h2 className="display-5 fw-bold mb-3">How It Works</h2>
                    <p className="text-muted lead">Get up and running in three simple steps.</p>
                </div>

                <div className="position-relative timeline-container">
                    {/* Vertical Line */}
                    <div className="position-absolute top-0 start-50 translate-middle-x h-100 bg-light d-none d-md-block" style={{ width: '4px', borderRadius: '2px' }}></div>

                    {steps.map((step, idx) => (
                        <Row key={idx} className="mb-5 align-items-center">
                            {/* Content Side */}
                            <Col md={5} className={`text-md-${idx % 2 !== 0 ? 'start' : 'end'} text-center mb-3 mb-md-0 order-2 ${idx % 2 !== 0 ? 'order-md-3' : 'order-md-1'}`}>
                                <Card className="border-0 shadow-sm hover-card rounded-4 position-relative overflow-hidden h-100">
                                    <div className={`position-absolute top-0 start-0 w-100 h-1 bg-${step.color}`}></div>
                                    <Card.Body className="p-4">
                                        <h3 className="fw-bold h4 mb-3">{step.title}</h3>
                                        <p className="text-muted mb-0">{step.description}</p>
                                    </Card.Body>
                                </Card>
                            </Col>

                            {/* Center Icon/Number */}
                            <Col md={2} className="text-center position-relative order-1 order-md-2 mb-3 mb-md-0">
                                <div className={`rounded-circle bg-${step.color} text-white d-flex align-items-center justify-content-center mx-auto shadow-lg position-relative z-1 hover-scale`}
                                    style={{ width: '60px', height: '60px', fontSize: '1.5rem' }}>
                                    <i className={`bi ${step.icon}`}></i>
                                </div>
                            </Col>

                            {/* Empty Side for balance */}
                            <Col md={5} className={`d-none d-md-block order-3 ${idx % 2 !== 0 ? 'order-md-1' : 'order-md-3'}`}></Col>
                        </Row>
                    ))}
                </div>
            </Container>
        </section>
    );
}
