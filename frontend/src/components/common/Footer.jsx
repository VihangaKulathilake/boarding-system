import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
    return (
        <footer className="footer mt-auto py-3 bg-white border-top">
            <Container>
                <Row>
                    <Col className="text-center">
                        <span className="text-muted">© 2026 Boarding System</span>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}
