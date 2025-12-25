import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ConfirmationPage from './pages/ConfirmationPage';
import { useAuth } from './context/AuthContext';

export default function App() {
    const { user } = useAuth();

    return (
        <Routes>
            <Route
                path="/login"
                element={!user ? <LoginPage /> : <Navigate to="/" replace />}
            />
            <Route
                path="/confirmation"
                element={user ? <ConfirmationPage /> : <Navigate to="/" replace />}
            />
            <Route
                path="/"
                element={
                    user ? (
                        <Dashboard />
                    ) : (
                        <Navigate to="/login" replace />
                    )
                }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
