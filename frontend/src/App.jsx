import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Footer from './components/common/Footer';
import './index.css';

function App() {
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <main className="flex-1">
                    <AppRoutes />
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
