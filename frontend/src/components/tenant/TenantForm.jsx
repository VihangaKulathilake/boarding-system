import React from 'react';
import { Form, Card } from 'react-bootstrap';
import Button from '../common/Button';

export default function TenantForm() {
    return (
        <Card className="shadow-sm">
            <Card.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="tenantName">
                        <Form.Label>Tenant Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter tenant name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="tenantEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Add Tenant
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}
