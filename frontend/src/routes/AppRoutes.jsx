import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/landing/LandingPage';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ClientHome from '../pages/dashboard/ClientHome';
import Dashboard from '../pages/dashboard/Dashboard';
import Boardings from '../pages/boarding/Boardings';
import AddBoarding from '../pages/boarding/AddBoarding';
import EditBoarding from '../pages/boarding/EditBoarding';
import Tenants from '../pages/tenant/Tenants';
import AddTenant from '../pages/tenant/AddTenant';
import Payments from '../pages/payment/Payments';
import Marketplace from '../pages/client/Marketplace';
import BoardingDetails from '../pages/client/BoardingDetails';
import MyBookings from '../pages/client/MyBookings';
import Maintenance from '../pages/client/Maintenance';
import Profile from '../pages/client/Profile';
import NotFound from '../NotFound';

export default function AppRoutes() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/register" element={<Register />} />

            {/* User/Client Routes */}
            <Route path="/client-home" element={<ClientHome />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/boarding/:id" element={<BoardingDetails />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/profile" element={<Profile />} />

            {/* Admin/Dashboard Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/boardings" element={<Boardings />} />
            <Route path="/boardings/add" element={<AddBoarding />} />
            <Route path="/boardings/edit/:id" element={<EditBoarding />} />

            <Route path="/tenants" element={<Tenants />} />
            <Route path="/tenants/add" element={<AddTenant />} />

            <Route path="/payments" element={<Payments />} />

            {/* Fallback */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
