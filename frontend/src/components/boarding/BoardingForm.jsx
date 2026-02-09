import React from 'react';
import { Form, Card } from 'react-bootstrap';
import Button from '../common/Button';

export default function BoardingForm() {
    return (
        <Card className="shadow-sm">
            <Card.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Boarding Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter boarding name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="Enter address" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}
