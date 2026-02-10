import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const features = [
    {
        icon: 'bi-people-fill',
        title: 'Tenant Management',
        description: 'Easily track tenant details, lease agreements, and history in one secure place.',
        color: 'primary'
    },
    {
        icon: 'bi-wallet2',
        title: 'Automated Payments',
        description: 'Set up recurring rent payments and get instant notifications for due dates.',
        color: 'success'
    },
    {
        icon: 'bi-graph-up-arrow',
        title: 'Insightful Analytics',
        description: 'Visualize your occupancy rates and financial health with interactive dashboards.',
        color: 'info'
    },
    {
        icon: 'bi-shield-check',
        title: 'Secure & Reliable',
        description: 'Your data is protected with enterprise-grade security and regular backups.',
        color: 'warning'
    }
];

export default function FeaturesSection() {
    return (
        <section className="py-5 bg-light" id="features">
            <Container className="py-5">
                <div className="text-center mb-5">
                    <span className="text-primary fw-bold text-uppercase tracking-wider">Features</span>
                    <h2 className="display-5 fw-bold mb-3">Everything You Need</h2>
                    <p className="text-muted lead mx-auto" style={{ maxWidth: '600px' }}>
                        Powerful tools designed to simplify boarding house management for owners and tenants alike.
                    </p>
                </div>
                <Row className="g-4">
                    {features.map((feature, idx) => (
                        <Col md={6} lg={3} key={idx}>
                            <Card className="h-100 border-0 shadow-sm hover-card rounded-4">
                                <Card.Body className="p-4 text-center">
                                    <div className="icon-box mb-4 mx-auto bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                                        <i className={`bi ${feature.icon} fs-2`}></i>
                                    </div>
                                    <h4 className="fw-bold mb-3">{feature.title}</h4>
                                    <p className="text-muted mb-0">{feature.description}</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
}
