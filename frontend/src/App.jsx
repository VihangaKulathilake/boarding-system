import React from 'react';
import AdminNavbar from './components/common/AdminNavbar';
import UserNavbar from './components/common/UserNavbar';
import Sidebar from './components/common/Sidebar';
import Footer from './components/common/Footer';
import BoardingCard from './components/boarding/BoardingCard';
import BoardingForm from './components/boarding/BoardingForm';
import TenantForm from './components/tenant/TenantForm';
import PaymentTable from './components/payment/PaymentTable';
import { Container, Row, Col } from 'react-bootstrap';

function App() {
    return (
        <div className="d-flex flex-column min-vh-100 bg-light">
            <div className="mb-4">
                <UserNavbar />
            </div>

            {/* <Navbar /> (Removed in favor of distinct examples) */}
            {/* <div className="d-flex flex-grow-1">
                <Sidebar />
                <Container className="p-4">
                    <h1>Dashboard</h1>
                    <Row className="mb-4">
                        <Col>
                            <h2>Boarding</h2>
                            <div className="d-flex gap-3 flex-wrap">
                                <BoardingCard />
                                <BoardingCard />
                            </div>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col md={6}>
                            <h2>Add Boarding</h2>
                            <BoardingForm />
                        </Col>
                        <Col md={6}>
                            <h2>Add Tenant</h2>
                            <TenantForm />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h2>Payments</h2>
                            <PaymentTable />
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer /> */}
        </div>
    );
}

export default App;
