import React from 'react';
import { Table } from 'react-bootstrap';
import Button from '../common/Button';

export default function PaymentTable() {
    return (
        <Table striped bordered hover>
            <thead className="table-light">
                <tr>
                    <th>#</th>
                    <th>Tenant Name</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Mark Otto</td>
                    <td>$100</td>
                    <td>2023-01-01</td>
                    <td><Button variant="danger" size="sm">Delete</Button></td>
                </tr>
            </tbody>
        </Table>
    );
}
