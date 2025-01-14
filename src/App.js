import React, {useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StepWizard from './components/StepWizard';
import Dashboard from './components/Dashboard';

function App() {
    const [resetKey, setResetKey] = useState(0);

    const handleReset = () => {
        localStorage.clear();
        setResetKey(prev => prev + 1);
    };

    return (
        <Router>
            <div className="min-h-screen bg-gray-50">
                <nav className="bg-white shadow mb-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex space-x-8 space-x-reverse">
                                <Link
                                    to="/"
                                    className="inline-flex items-center px-1 pt-1 text-gray-800 hover:text-rose-500"
                                >
                                    דף הבית
                                </Link>
                                <Link
                                    to="/dashboard"
                                    className="inline-flex items-center px-1 pt-1 text-gray-800 hover:text-rose-500"
                                >
                                    צפייה בברכות
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                <Routes>
                    <Route path="/" element={<StepWizard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;