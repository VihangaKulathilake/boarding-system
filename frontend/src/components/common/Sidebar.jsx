import React from 'react';
import { ListGroup } from 'react-bootstrap';

export default function Sidebar() {
    return (
        <div className="bg-white border-end" id="sidebar-wrapper" style={{ minWidth: '250px' }}>
            <div className="sidebar-heading border-bottom bg-white p-3 font-weight-bold">Menu</div>
            <ListGroup variant="flush">
                <ListGroup.Item action href="#dashboard">Dashboard</ListGroup.Item>
                <ListGroup.Item action href="#boardings">Boardings</ListGroup.Item>
                <ListGroup.Item action href="#tenants">Tenants</ListGroup.Item>
                <ListGroup.Item action href="#payments">Payments</ListGroup.Item>
            </ListGroup>
        </div>
    );
}
